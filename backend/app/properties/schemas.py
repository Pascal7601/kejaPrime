from pydantic import BaseModel

class PropertyPostModel(BaseModel):

  name: str
  location: str
  description: str
  bedrooms: int
  price: float

class PropertyResponseModel(BaseModel):

  landlord_id: str
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