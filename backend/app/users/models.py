from core.models import BaseModel
from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm import relationship

class User(BaseModel):

  __tablename__ = 'users'

  username = Column(String(256), unique=True)
  email = Column(String(256), nullable=False, unique=True)
  password_hash = Column(String(256), nullable=False)
  is_landlord = Column(Boolean, nullable=False, default=False)

  # relatioships

  properties = relationship("Property", back_populates="landlord", cascade="all, delete-orphan")
  feeds = relationship("Feed", back_populates="user", cascade="all, delete-orphan")