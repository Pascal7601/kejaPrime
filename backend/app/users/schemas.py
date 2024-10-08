from pydantic import BaseModel

class UserResponseModel(BaseModel):
  id: str
  username: str
  email: str
  is_landlord: bool
  location: str

class UserCreateModel(BaseModel):
  email: str
  password: str
  username: str
  role: str
  location: str

class UserUpdateModel(BaseModel):
  email: str
  username: str

