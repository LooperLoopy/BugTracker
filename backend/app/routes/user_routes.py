from fastapi import Depends, APIRouter
from app.schemas.user_schema import UserLogin, UserResponse, UserSignUp
from app.database.database import get_db
from sqlalchemy.orm import Session
from app.services.user_service import login, signup

router = APIRouter(prefix="/user")

@router.post("/signup", response_model = UserResponse)
async def signup(user_data: UserSignUp, db: Session = Depends(get_db)):
    result = signup(user_data, db)
    return result

@router.post("/login", response_model = UserResponse)
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    result = login(user_data, db)
    return result