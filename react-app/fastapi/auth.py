from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from starlette import status
from database import sessionLocal, get_db
from models import Users
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError


router = APIRouter(prefix='/auth')

bcrypt = CryptContext(schemes=["bcrypt"], deprecated='auto')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
SECRET_KEY = "ea9abce16802ab665c31ac8106775b7a6070366b23003cd7e2d40ab7d3beae01"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 240

class User(BaseModel):
  username: str
  age: int
  gender: str
  level: str
  points: int

class UserCreate(BaseModel):
  username: str
  password: str
  email: EmailStr
  age: int
  gender: str | None

class UserLogin(BaseModel):
  username: str
  password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# UTILITY FUNCTIONS
  
def verify_password(plain_password, hashed_password):
  return bcrypt.verify(plain_password, hashed_password)
  
  
def authenticate_user(username: str, password: str, db):

  user = db.query(Users).filter(username == Users.username).first()
  
  if not user:
    return False
  if not verify_password(password, user.hashed_password):
    return False
  
  return user

def create_token(data: dict, expires: timedelta):
  encode = data.copy()
  expire = datetime.now(timezone.utc) + expires
  encode.update({"exp": expire})
  encoded_jwt = jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
   try:
      payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
      user = db.query(Users).filter(payload['sub'] == Users.username).first()
   except:
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="user not authorized")
   
   return user

# AUTHENTICATION PATH OPERATIONS

@router.post('/register')
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
  user = Users(username=user.username, email=user.email, hashed_password=bcrypt.hash(user.password), age=user.age, gender=user.gender, level="E class", points=0)
  if db.query(Users).filter(user.email == Users.email).first():
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
  db.add(user)
  db.commit()
  db.refresh(user)
  return user

@router.post('/login')
async def user_login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

  user = authenticate_user(form_data.username, form_data.password, db)
  if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
  access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  
  token = create_token(data={"sub": user.username }, expires=access_token_expires)

  return Token(access_token=token, token_type="bearer")

@router.get('/current-user')
def get_user(user: Users = Depends(get_current_user)):
   return user
   

