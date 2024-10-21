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
#from minio import Minio
#from minio.error import S3Error
import uuid
# from app.properties.views import minio_client, bucket_name
from app.properties.models import PropertyImage
from core import settings
import os


feed_route = APIRouter(prefix='/api/v1/feeds', tags=['feeds'])


@feed_route.get('/me')
async def my_feeds(
   db: Session = Depends(get_db),
   credentials: HTTPBasicCredentials = Depends(security)
):
  """
   fetch personal user feeds
  """
  token = credentials.credentials
  payload = decode_token(token)
  email = payload.get("sub")
  if not email:
    raise HTTPException(status_code=401, detail="Invalid token or no email found.")
  
  user = User.get_user_by_email(email, db)
  if user.is_landlord:
    raise http_msg.forbidden()
  
  feeds = db.query(Feed).filter(Feed.user_id == user.id).all()
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
   

@feed_route.post('/')
async def upload_feed(
  location: str = Form(...),
  description: str = Form(...),
  file: UploadFile = File(...),
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
        # Save the uploaded file to local storage
        file_location = os.path.join(settings.UPLOAD_DIRECTORY, file.filename)
        
        # Write the file to disk
        with open(file_location, "wb") as f:
            f.write(await file.read())

        # Save image metadata to the database
        new_image = FeedImage(
            feed_id=new_feed.id,
            image_url=file_location  # Store the file path in the DB
        )
        db.add(new_image)
        db.commit()

  except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to upload image")

  return {"message": "Image successfully uploaded", "url": file_location}


@feed_route.get('/{feed_id}')
async def all_feeds(
   feed_id: str,
   db: Session = Depends(get_db),
):
  """
  retrieve all user feeds
  """
  
  feed = db.query(Feed).filter_by(id=feed_id).first()
  if not feed:
     raise http_msg.not_found("feeds")
  
  feed_data = []
  images = db.query(FeedImage).filter_by(feed_id=feed.id).all()
  feed_data.append({
        "id": feed.id,
        "user_id": feed.user_id,
        "location": feed.location,
        "description": feed.description,
        "images": [{"image_url": image.image_url} for image in images]
    })
    
  return feed_data


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
  
  image_path = image.image_url
    # Attempt to delete the image from local storage
  try:
        if os.path.exists(image_path):
            os.remove(image_path)
        else:
            raise HTTPException(status_code=404, detail="Image file not found on disk")
  except Exception as err:
        raise HTTPException(status_code=500, detail=f"Error deleting image from local storage: {err}")
    
    # Delete the image record from the database
  db.delete(feed)
  db.commit()
    
  return {"message": "Feed deleted successfully"}


