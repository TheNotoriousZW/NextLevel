from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import models
from database import engine, sessionLocal, get_db
from sqlalchemy.orm import Session
import auth
from database import get_db




app = FastAPI()
app.include_router(auth.router)

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:5500",
    "http://localhost:5173"
]


app.add_middleware(
  CORSMiddleware, allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get('/users-count')
def user_count(db: Session = Depends(get_db)):
  users_count = db.query(models.Users).count()
  return users_count













