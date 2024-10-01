from fastapi import Depends, HTTPException, status
from fastapi import APIRouter
from core.database import get_db
from .models import User
from . import schemas
from sqlalchemy.orm import Session
from core import http_msg
from app.auth.auth import generate_hash_pwd


user_route = APIRouter(prefix='/api/v1/users', tags=['users'])


@user_route.get('/', response_model=list[schemas.UserResponseModel])
def all_users(db: Session = Depends(get_db)):
  """
  retrieve all tenants and landlords in the database
  """
  users = db.query(User).all()
  return users

@user_route.post('/user')
def add_user(user_data: schemas.UserCreateModel, db: Session = Depends(get_db)):
  """
  add users into the database
  """
  # check whether the user already exists
  existing_user = User.get_user_by_email(user_data.email, db)
  if existing_user:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail='user already exists'
    )
  
  if user_data.role == 'landlord':
    is_landlord = True
  else:
    is_landlord = False

  hashed_pwd = generate_hash_pwd(user_data.password)

  user = User(
    email = user_data.email,
    username=user_data.username,
    password_hash=hashed_pwd,
    is_landlord=is_landlord
  )
  db.add(user)
  db.commit()
  return http_msg.created("User successfully created")


@user_route.put('/user', response_model=list[schemas.UserResponseModel])
def update_user(email: str, user_data: schemas.UserUpdateModel, db: Session = Depends(get_db)):
  """
  update user details
  """
  existing_user = User.get_user_by_email(email, db)
  if not existing_user:
    raise http_msg.not_found('User')
  
  existing_user.username = user_data.username
  existing_user.email = user_data.email

  db.commit()
  db.refresh(existing_user)
  return existing_user


@user_route.delete('/user')
def delete_user(email: str, db: Session = Depends(get_db)):
  """
  delete an existing user
  """
  existing_user = User.get_user_by_email(email, db)
  if not existing_user:
    raise http_msg.not_found('User')
  
  db.delete(existing_user)
  db.commit()
  return {"message": f"user {existing_user.username} deleted succesfully"}
