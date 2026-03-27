from pydantic import BaseModel

#Request Models
class UserLogin(BaseModel):
    login: str #email or username
    password: str

class UserSignUp(BaseModel):
    username: str
    email: str
    password: str

#Helper model to help nest info into object field
class UserInfo(BaseModel):
    id: int
    username: str
    email: str

#Response Model
class UserResponse(BaseModel):
    user: UserInfo
    access_token: str
    token_type: str