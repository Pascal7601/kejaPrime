from dotenv import load_dotenv
import os


load_dotenv()

# DATABASE CONFIG
MYSQL_USER = os.getenv('MYSQL_USER', 'pascal')
MYSQL_PWD = os.getenv('MYSQL_PWD', 'pascal')
MYSQL_DB = os.getenv('MYSQL_DB', 'kejaPrime_db')
