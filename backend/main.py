from fastapi import FastAPI
from core.models import Base
from core.database import engine
from app.users.models import User
from app.properties.models import Property, PropertyImage
from app.feeds.models import Feed
from app.users.views import user_route
from app.auth.views import auth_route
from app.properties.views import property_route
from app.feeds.views import feed_route
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(auth_route)
app.include_router(user_route)
app.include_router(property_route)
app.include_router(feed_route)

# Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def home():
  return {"message": "this is home"}