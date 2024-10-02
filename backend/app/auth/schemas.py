from pydantic import BaseModel


class UserSignInModel(BaseModel):

  email: str
  password: str