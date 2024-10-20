from core.models import BaseModel
from sqlalchemy import Column, String, ForeignKey, Float
from sqlalchemy.orm import relationship


class Bookmarks(BaseModel):
  
  __tablename__ = 'bookmarks'
  user_id = Column(ForeignKey('users.id'))
  property_id = Column(ForeignKey('properties.id'), nullable=True)
  feed_id = Column(ForeignKey('feeds.id'), nullable=True)

  # relationships
  user = relationship('User', back_populates='bookmarks')
  feed = relationship('Feed', back_populates='bookmarks')
  property = relationship('Property', back_populates='bookmarks')