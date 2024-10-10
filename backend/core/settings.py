from dotenv import load_dotenv
import os
from pathlib import Path


load_dotenv()

# DATABASE CONFIG
MYSQL_USER = os.getenv('MYSQL_USER', 'pascal')
MYSQL_PWD = os.getenv('MYSQL_PWD', 'pascal')
MYSQL_DB = os.getenv('MYSQL_DB', 'kejaPrime_db')

# jwt authentication
EXPIRY_TIME = os.getenv('EXPIRY_TIME')
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

# local storage for images config
UPLOAD_DIRECTORY = "uploads/"

# Create the directory if it doesn't exist
Path(UPLOAD_DIRECTORY).mkdir(parents=True, exist_ok=True)
