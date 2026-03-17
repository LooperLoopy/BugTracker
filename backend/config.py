from dotenv import load_dotenv
import os

load_dotenv()

#Auth
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRES_MINUTES", 60))

#DB
DATABASE_URL = os.getenv("DATABASE_URL")
