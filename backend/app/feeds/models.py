from core.models import BaseModel
from sqlalchemy import Column, String, ForeignKey, Float
from sqlalchemy.orm import relationship


class Feed(BaseModel):

  __tablename__ = 'feeds'

  user_id = Column(ForeignKey('users.id'), nullable=False)
  location = Column(Float)
  image_url = Column(String(256))
  description = Column(String(256))

  # relationships
  user = relationship('User', back_populates='feeds')
  