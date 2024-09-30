from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from . import settings
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine(
  f'mysql+mysqldb://{settings.MYSQL_USER}:{settings.MYSQL_PWD}@localhost:3308/{settings.MYSQL_DB}'
  )

session = sessionmaker(bind=engine)

Base = declarative_base()