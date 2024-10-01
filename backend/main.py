from fastapi import FastAPI
from core.models import Base
from core.database import engine
from app.users.models import User
from app.properties.models import Property, PropertyImage
from app.feeds.models import Feed

app = FastAPI()

Base.metadata.create_all(engine)

@app.get('/')
async def home():
  return {"message": "this is home"}