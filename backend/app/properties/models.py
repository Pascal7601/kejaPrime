from core.models import BaseModel
from sqlalchemy import Column, String, ForeignKey, Text, Float
from sqlalchemy.orm import relationship


class Property(BaseModel):

  __tablename__ = 'properties'

  landlord_id = Column(String(256), ForeignKey('users.id'), nullable=False) 
  name = Column(String(256), nullable=False)
  location = Column(String(256), nullable=False)
  description = Column(Text, nullable=True)
  price = Column(Float, nullable=False)
  image_url = Column(String(512), nullable=False)

  # relatioships
  landlord = relationship("User", back_populates="properties")


class PropertyImage(BaseModel):
    __tablename__ = 'property_images'

    property_id = Column(String(256), ForeignKey('properties.id'), nullable=False)
    image_url = Column(String(512), nullable=False) 

    # relationships
    property = relationship("Property", back_populates="images")
