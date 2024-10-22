from dotenv import load_dotenv
import os
from fastapi import HTTPException
import requests
from typing import List
from pydantic import EmailStr, BaseModel
from pathlib import Path

load_dotenv()

# DATABASE CONFIG
#MYSQL_USER = os.getenv('MYSQL_USER', 'pascal')
MYSQL_USER = os.getenv('MYSQL_USER', 'momi')
# MYSQL_USER = os.getenv('MYSQL_USER', 'lupamo')
#MYSQL_PWD = os.getenv('MYSQL_PWD', 'pascal')
MYSQL_PWD = os.getenv('MYSQL_PWD', '0701187321')
# MYSQL_PWD = os.getenv('MYSQL_PWD', '52535504Arn_')
MYSQL_DB = os.getenv('MYSQL_DB', 'kejaPrime_db')

# jwt authentication
EXPIRY_TIME = os.getenv('EXPIRY_TIME')
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

# email api key
EMAIL_API_KEY = os.getenv('EMAIL_API')

""""
handle sending email to users
"""

# class EmailSchema(BaseModel):
#     email: List[EmailStr]
#     subject: str
#     body: str


# MAILGUN_DOMAIN = "sandboxa8f8a6e1e76c4ba8b15f9b9505a7c866.mailgun.org" # sandbox domain
# MAILGUN_BASE_URL = f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN}/messages"
# MAILGUN_SENDER = f"Excited User <mailgun@{MAILGUN_DOMAIN}>"


# async def send_simple_message(email: str):
#   response =  requests.post(
#   		"https://api.mailgun.net/v3/sandboxa8f8a6e1e76c4ba8b15f9b9505a7c866.mailgun.org/messages",
#   		auth=("api", EMAIL_API_KEY),
#   		data={"from": "Excited User <mailgun@sandboxa8f8a6e1e76c4ba8b15f9b9505a7c866.mailgun.org>",
#   			"to": email,
#   			"subject": "Hello",
#   			"text": "Testing some Mailgun awesomeness!"})
#   if response.status_code != 200:
#       return {"status": "failed", "message": f"Failed to send email to {email}"}

#   return {"status": "success", "message": "Emails sent successfully"}


""" define storage for files
"""
UPLOAD_DIRECTORY: str = "uploads/"

# Ensure the upload directory exists
Path(UPLOAD_DIRECTORY).mkdir(parents=True, exist_ok=True)