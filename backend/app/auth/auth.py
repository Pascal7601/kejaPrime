import jwt
from core import settings
from datetime import timedelta, datetime
from fastapi import HTTPException
from passlib.context import CryptContext


secret_key = settings.SECRET_KEY
algo = settings.ALGORITHM
expiry = 30

def generate_token(data: dict):
  """generate an access token
  """
  expiry_time = timedelta(minutes=expiry)
  expiration_time = datetime.utcnow() + expiry_time

  data_copy = data.copy()
  data_copy.update({'exp': expiration_time})
  token = jwt.encode(data_copy, secret_key, algorithm=algo)

  return token


def decode_token(token: str):
  """ decode jwt token to extract user information
  """
  try:
        payload = jwt.decode(token, secret_key, algorithms=[algo])
        return payload
  except jwt.ExpiredSignatureError:
      raise HTTPException(status_code=401, detail="Token has expired")
  except jwt.InvalidTokenError:
      raise HTTPException(status_code=401, detail="Invalid token")


pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")
def generate_hash_pwd(password: str):
    """
    hash the normal password
    """
    hashed_pwd = pwd_context.hash(password)

    return hashed_pwd

def verify_password(password: str, hashed_pwd: str):
    return pwd_context.verify(password, hashed_pwd)