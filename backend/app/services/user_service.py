from app.schemas.user_schema import UserLogin, UserSignUp, UserInfo, UserResponse
from app.auth.access_token import create_access_token
from app.auth.security import get_hash_password, verify_password
from app.database.datamodels import User
from fastapi import HTTPException
def signup(user_data: UserSignUp, db):
    #1. Query db to check if user/email exists
    email_exists = db.query(User).filter(User.email == user_data.email).first()
    if email_exists:
        raise HTTPException(status_code=409, detail="Email already registered")
    username_exists = db.query(User).filter(User.username == user_data.username).first()
    if username_exists:
        raise HTTPException(status_code=409, detail="Username already taken")
    #2. hash password
    hashed_password = get_hash_password(user_data.password)
    #3. save user to db
    new_user=User(
        username = user_data.username,
        email = user_data.email,
        hashed_password = hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    #4. create jwt token
    access_token = create_access_token(
        {
            "sub": str(new_user.id)
        }
    )
    #5. return user info + token
    return UserResponse(
        access_token = access_token,
        token_type = "bearer",
        user = UserInfo(
            username = new_user.username,
            email = new_user.email,
            id = new_user.id
        )   
    )
def login(user_data: UserLogin, db):
    #1. Verify email / username exists (save to a user object)
    user = db.query(User).filter(
        (User.email == user_data.login) | (User.username == user_data.login)
    ).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    #2. Compare password with db password
    if not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="InvalidCredentials")
    #3. create jwt
    access_token = create_access_token(
        {
            "sub": str(user.id)
        }
    )
    return UserResponse(
        access_token = access_token,
        token_type = "bearer",
        user = UserInfo(
            username = user.username,
            email = user.email,
            id = user.id
        )   
    )