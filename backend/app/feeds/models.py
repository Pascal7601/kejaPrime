from core.models import BaseModel
from sqlalchemy import Column, String, ForeignKey, Float
from sqlalchemy.orm import relationship


class Feed(BaseModel):

  __tablename__ = 'feeds'

  user_id = Column(ForeignKey('users.id'), nullable=False)
  location = Column(String(256))
  description = Column(String(256))

  # relationships
  images = relationship("FeedImage", back_populates="feed", cascade="all, delete-orphan")
  user = relationship('User', back_populates='feeds')
  bookmarks = relationship("Bookmarks", back_populates="feed")

class FeedImage(BaseModel):
    __tablename__ = 'feed_images'

    feed_id = Column(ForeignKey('feeds.id'), nullable=False)  # Feed ID (user feed)
    image_url = Column(String(256), nullable=False)

    feed = relationship("Feed", back_populates="images")
  