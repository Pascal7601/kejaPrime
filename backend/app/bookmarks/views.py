from fastapi import Depends, APIRouter, UploadFile, HTTPException, File, Form
from app.auth.views import security
from fastapi.security import HTTPBasicCredentials
from core.database import get_db
from sqlalchemy.orm import Session
from app.auth.auth import decode_token
from app.users.models import User
from core import http_msg
from .models import Bookmarks
from . import schemas
from app.feeds.models import Feed
from app.properties.models import Property



bookmark_route = APIRouter(prefix='/api/v1/bookmarks', tags=['bookmarks'])


@bookmark_route.get('/')
async def get_all_bookmarks(
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
):
    """
    Fetch all bookmarks for the authenticated user
    """
    # Decode the token to get the user's email
    token = credentials.credentials
    payload = decode_token(token)
    email = payload.get('sub')

    if not email:
        raise HTTPException(status_code=401, detail="Invalid token or no email found.")
    
    # Fetch the user from the database
    user = User.get_user_by_email(email, db)
    if not user:
        raise http_msg.not_found("user")
    
    # Query all bookmarks for the user
    bookmarks = db.query(Bookmarks).filter_by(user_id=user.id).all()

    if not bookmarks:
        raise http_msg.not_found("bookmarks")

    # Prepare the response with feed and/or property details
    result = []
    for bookmark in bookmarks:
        if bookmark.feed_id:
            feed = db.query(Feed).get(bookmark.feed_id)
            result.append({
                "id": bookmark.id,
                "feed": {
                   "user_id": feed.user_id,
                    "id": feed.id,
                    "description": feed.description,
                    "location": feed.location
                }
            })
        if bookmark.property_id:
            property = db.query(Property).get(bookmark.property_id)
            result.append({
                "id": bookmark.id,
                "property": {
                   "landlord_id": property.landlord_id,
                    "id": property.id,
                    "name": property.name,
                    "location": property.location,
                    "bedrooms": property.bedrooms,
                    "price": property.price
                }
            })
    
    return {"bookmarks": result}


@bookmark_route.post('/feeds/{feed_id}')
async def save_feed(
  feed_id: str,
  db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
  ):
  """
  save a feed and store it in bookmarks db
  """
  token = credentials.credentials
  payload = decode_token(token)
  email = payload.get('sub')
  if not email:
    raise HTTPException(status_code=401, detail="Invalid token or no email found.")
  
  user = User.get_user_by_email(email, db)
  if user.is_landlord:
    raise http_msg.forbidden()
  
  feed = Feed.get_feed_by_id(feed_id, db)
  if not feed:
    raise http_msg.not_found("feed")
  
  existing_feed_id = db.query(Bookmarks).filter_by(feed_id=feed.id).first()
  if existing_feed_id:
    raise http_msg.internal_server_error("feed is already saved")
  
  new_bookmark = Bookmarks(
    user_id=user.id,
    feed_id=feed.id
  )
  db.add(new_bookmark)
  db.commit()
  return {"message": "successfully saved feed"}


@bookmark_route.post('/properties/{property_id}')
async def save_property(
  property_id: str,
  db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
  ):
  """
  save a property and store it in bookmarks db
  """
  token = credentials.credentials
  payload = decode_token(token)
  email = payload.get('sub')
  if not email:
    raise HTTPException(status_code=401, detail="Invalid token or no email found.")
  
  user = User.get_user_by_email(email, db)
  if user.is_landlord:
    raise http_msg.forbidden()
  
  property = Property.get_property_by_id(property_id, db)
  if not property:
    raise http_msg.not_found("property")
  
  existing_feed_id = db.query(Bookmarks).filter_by(property_id=property.id).first()
  if existing_feed_id:
    raise http_msg.internal_server_error("property is already saved")
  
  new_bookmark = Bookmarks(
    user_id=user.id,
    property_id=property.id
  )
  db.add(new_bookmark)
  db.commit()
  return {"message": "successfully saved property"}

