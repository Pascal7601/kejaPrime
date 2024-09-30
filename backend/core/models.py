from sqlalchemy import Column, Integer, String, DateTime, func
from uuid import uuid4
from .database import Base

class BaseModel(Base):
  
  __abstract__ = True

  id = Column(String(256), primary_key=True, nullable=False, unique=True, default=lambda: str(uuid4()))
  created_at = Column(DateTime, default=func.now())
  updated_at = Column(DateTime, default=func.now(), onupdate=func.now())