from fastapi import FastAPI
from core.models import Base
from core.database import engine
from app.users.models import User
from app.properties.models import Property, PropertyImage
from app.feeds.models import Feed
from app.users.views import user_route
from app.auth.views import auth_route
from app.properties.views import property_route
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.include_router(auth_route)
app.include_router(user_route)
app.include_router(property_route)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

@app.get('/')
async def home():
  return {"message": "this is home"}