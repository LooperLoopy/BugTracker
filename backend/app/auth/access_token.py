import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.database.datamodels import User
from app.database.database import get_db
from sqlalchemy.orm import Session
"""
create and verify jwt
"""
SECRET = "looooongsecretttjdsahposaiodsaoudsaoi2918321873721398hjhjshjshdjsa"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(olddata: dict):
    """
    Input: a string-string dictionary with user id or anything else we wanna put in jwt
    payload
    Return: jwt token string
    """
    data = olddata.copy()
    data["exp"] = 6942067
    return jwt.encode(data, SECRET, "HS256")
def verify_access_token(token: str = Depends(oauth2_scheme)):
    """
    extract token and validate
    """
    try:
        payload = jwt.decode(token, SECRET, ["HS256"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload
def get_current_user(payload: dict = Depends(verify_access_token), db: Session = Depends(get_db)) -> User:
    user_id = payload["sub"]
    user = db.query(User).filter(User.id == user_id).first()
    return user
"""
if __name__ == "__main__":
    access_token = create_access_token({"sub": "123"})
    print("your access token is: " + access_token)
"""
