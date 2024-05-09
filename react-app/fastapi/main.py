from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import models
from database import engine, sessionLocal, get_db
from sqlalchemy.orm import Session
import auth
from schemas import UserUpdate, userDt, DtUpdate
from sqlalchemy import update
from auth import get_current_user, Users




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

@app.put('/user-track')
def userTracking(user: UserUpdate, db: Session = Depends(get_db)):
  
  
  db_user = db.query(models.Users).filter(models.Users.username == user.username).first()
  db_user.points = user.points
  db_user.level = user.level
  db.commit()
  db.refresh(db_user)

@app.post('/userDt')
def add_target(target: userDt, db: Session = Depends(get_db)):
  daily_target = models.Dailytargets(user=target.username, target_name=target.targetname, start_time=target.start_time, completed=target.completed, dailypoints=target.dailypoints, origin=target.origin, bonus=target.bonus)
  db.add(daily_target)
  db.commit()
  return db.query(models.Dailytargets).filter(target.targetname == models.Dailytargets.target_name).first()

@app.get('/userDtarg')
def get_target(username , db: Session = Depends(get_db)):
  dailyTargets = db.query(models.Dailytargets).filter(username == models.Dailytargets.user).all()
  return dailyTargets

@app.put('/Dt')
def update_target(target: DtUpdate,db: Session = Depends(get_db)):
  dt = db.query(models.Dailytargets).filter(target.target_name == models.Dailytargets.target_name).first()
  dt.completed = target.completed
  dt.consistency = target.consistency
  dt.start_time = target.start_time
  dt.bonus = target.bonus
  db.add(dt)
  db.commit()





