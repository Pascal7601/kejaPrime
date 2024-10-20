from core.models import BaseModel
from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm import relationship



class User(BaseModel):

  __tablename__ = 'users'

  username = Column(String(256))
  email = Column(String(256), nullable=False, unique=True)
  password_hash = Column(String(256), nullable=False)
  is_landlord = Column(Boolean, nullable=False, default=False)
  location = Column(String(256))

  # relatioships

  properties = relationship("Property", back_populates="landlord", cascade="all, delete-orphan")
  feeds = relationship("Feed", back_populates="user", cascade="all, delete-orphan")
  bookmarks = relationship("Bookmarks", back_populates="user")


  @classmethod
  def get_user_by_email(cls, email: str, db):
    """
    retrieve a user by email if exists else returns none
    """
    user = db.query(cls).filter_by(email=email).first()
    return user
