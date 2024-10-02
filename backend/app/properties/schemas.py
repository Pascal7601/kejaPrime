from pydantic import BaseModel

class PropertyPostModel(BaseModel):

  name: str
  location: str
  description: str
  bedrooms: int
  price: float

class PropertyResponseModel(BaseModel):

  id: str
  name: str
  location: str
  description: str
  bedrooms: int
  price: float

class PropertyImageResponseModel(BaseModel):

  id: str
  property_id: str
  image_url: str