from fastapi import Depends, APIRouter, UploadFile, HTTPException, File, Form
from app.auth.views import security
from fastapi.security import HTTPBasicCredentials
from core.database import get_db
from sqlalchemy.orm import Session
from app.auth.auth import decode_token
from app.users.models import User
from core import http_msg
from .models import Feed, FeedImage
from . import schemas
from minio import Minio
from minio.error import S3Error
import uuid
from app.properties.views import minio_client, bucket_name
from app.properties.models import PropertyImage


feed_route = APIRouter(prefix='/api/v1/feeds', tags=['feeds'])


@feed_route.post('/')
async def upload_feed(
  location: str,
  description: str,
  file: UploadFile,
  db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  """
  upload feeds as users to the database
  """
  token = credentials.credentials
  payload = decode_token(token)
  email = payload.get("sub")
  if not email:
    raise HTTPException(status_code=401, detail="Invalid token or no email found.")
  
  user = User.get_user_by_email(email, db)
  if user.is_landlord:
    raise http_msg.forbidden()
  
  new_feed = Feed(
    user_id=user.id,
    location=location,
    description=description
  )

  db.add(new_feed)
  db.commit()
  db.refresh(new_feed)
  
  try:
    # Upload file to MinIO and store the image metadata
      image_id = str(uuid.uuid4())
      image_path = f"{new_feed.id}/{image_id}.{file.filename.split('.')[-1]}"

      file.file.seek(0, 2)  # Seek to the end to get the size
      file_size = file.file.tell()  # Get the size
      file.file.seek(0) 

      # Upload the image file to MinIO
      minio_client.put_object(
          bucket_name,
          image_path,
          file.file,
          length=file_size,
          content_type=file.content_type
    )

            # Store the image URL in the database
      image_url = f"http://localhost:9000/{bucket_name}/{image_path}"
      new_image = FeedImage(
                feed_id=new_feed.id,
                image_url=image_url
            )
      db.add(new_image)

      db.commit()

  except S3Error as err:
      raise HTTPException(status_code=500, detail=f"Error uploading image: {err}")

  return {"message": "Feed created successfully", "feed_id": new_feed.id}


@feed_route.get('/')
async def all_feeds(
   db: Session = Depends(get_db),
   credentials: HTTPBasicCredentials = Depends(security)
):
  """
  retrieve all user feeds
  """
  token = credentials.credentials
  payload = decode_token(token)
  email = payload.get("sub")
  if not email:
    raise HTTPException(status_code=401, detail="Invalid token or no email found.")
  
  user = User.get_user_by_email(email, db)
  if user.is_landlord:
    raise http_msg.forbidden()
  
  feeds = db.query(Feed).filter(
     (Feed.location == user.location) |
     (Feed.description.ilike(f"%{user.location}%"))
  ).all()
  if not feeds:
     raise http_msg.not_found("feeds")
  
  feed_data = []
  for feed in feeds:
      images = db.query(FeedImage).filter_by(feed_id=feed.id).all()
      feed_data.append({
        "id": feed.id,
        "user_id": feed.user_id,
        "location": feed.location,
        "description": feed.description,
        "images": [{"image_url": image.image_url} for image in images]
    })
    
  return feed_data

@feed_route.delete('/{feed_id}')
async def delete_feed(
   feed_id: str,
   db: Session = Depends(get_db),
   credentials: HTTPBasicCredentials = Depends(security)
):
  """
   delete a feed
  """
  token = credentials.credentials
  payload = decode_token(token)
  email = payload.get("sub")
  if not email:
    raise HTTPException(status_code=401, detail="Invalid token or no email found.")
  
  user = User.get_user_by_email(email, db)
  if user.is_landlord:
    raise http_msg.forbidden()
  
  feed = db.query(Feed).filter_by(id=feed_id).filter(Feed.user_id == user.id).first()
  if not feed:
     raise http_msg.forbidden("cannot delete a feed that you did not post")
  
  image = db.query(FeedImage).filter_by(feed_id=feed_id).first()
  image_path = f"{feed_id}/{image.id}.jpg"
  
  try:
     minio_client.remove_object(bucket_name, image_path)

  except S3Error as err:
      raise HTTPException(status_code=500, detail=f"Error deleting image from MinIO: {err}")
     
  
  db.delete(feed)
  db.commit()

  return {"message": "feed deleted succesfully"}


