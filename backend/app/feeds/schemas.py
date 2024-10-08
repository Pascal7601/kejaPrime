from pydantic import BaseModel

class FeedPostModel(BaseModel):

  location: str
  description: str