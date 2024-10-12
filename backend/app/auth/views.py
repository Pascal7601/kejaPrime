from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer
from . import schemas
from app.users.models import User
from core import http_msg
from . import auth
from sqlalchemy.orm import Session
from core.database import get_db
from fastapi.responses import JSONResponse


security = HTTPBearer()

auth_route = APIRouter(prefix='/api/v1/auth', tags=['auth'])

@auth_route.post('/sign_in')
def login(details: schemas.UserSignInModel, db: Session = Depends(get_db)):
  user = User.get_user_by_email(details.email, db)
  if not user:
    raise http_msg.not_found("User")
  
  if not auth.verify_password(details.password, user.password_hash):
    return {"message": "wrong password"}
  
  token = auth.generate_token({"sub": user.email})
  
  resp = JSONResponse(content={"access_token": token, "token_type": "bearer"})

  resp.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    secure=True
  )

  return resp

