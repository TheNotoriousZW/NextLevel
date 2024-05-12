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
from datetime import datetime, timedelta
import schedule
import threading
import time


def update_daily_targets():

  db = sessionLocal()

  
  try:

    targets = db.query(models.Dailytargets).all()
    
    for target in targets:

      start_time = datetime.strptime(f"{target.start_time}", "%Y-%m-%d %H:%M:%S.%f")
      current_time = datetime.now()
      time_difference = current_time - start_time

      

      if time_difference >= timedelta(seconds=30) and target.completed:
       

       target = db.query(models.Dailytargets).filter(target.target_name == models.Dailytargets.target_name).first()
      
       now = datetime.now()
       sql_timestamp = now.strftime('%Y-%m-%d %H:%M:%S.%f')

       target.start_time = sql_timestamp
       target.completed = False
       target.consistency += 0.2

       if target.consistency >= 1:
         target.dailypoints =  (target.consistency * 3) + target.dailypoints
         target.dailypoints =  round(target.dailypoints)

         db.commit()
         db.refresh(target)


       db.commit()
       db.refresh(target)
      

      elif time_difference >= timedelta(seconds=5) and not target.completed:

        now = datetime.now()
        sql_timestamp = now.strftime('%Y-%m-%d %H:%M:%S.%f')

        user = db.query(models.Users).filter(target.user == models.Users.username).first()
        
        target.start_time = sql_timestamp
        target.completed = False
        target.consistency -= 0.4
        user.points -= 5
        print("-5 points")

        if target.consistency < 0:
          target.consistency = 0
          target.dailypoints = 5

          db.commit()
          db.refresh(target)
          db.refresh(user)

        db.commit()
        db.refresh(target)
        db.refresh(user)

  except Exception as e:
    
    db.rollback()
    print(f'{e} occured')

  print("time updated")

def scheduler(task):
  schedule.every(45).seconds.do(task)

  while True:
    schedule.run_pending()
    time.sleep(1)

target_set = threading.Thread(target=scheduler, args=(update_daily_targets,))
target_set.start()

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
  db.close()

@app.post('/userDt')
def add_target(target: userDt, db: Session = Depends(get_db)):
  daily_target = models.Dailytargets(user=target.username, target_name=target.targetname, consistency=target.consistency, start_time=target.start_time, completed=target.completed, dailypoints=target.dailypoints, origin=target.origin, bonus=target.bonus)
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
  dt.dailypoints = target.dailypoints
  db.add(dt)
  db.commit()
  db.close()

@app.delete('/rmDt/{username}')
def clear_targets(username: str, db: Session = Depends(get_db)):

  for target in db.query(models.Dailytargets).filter(username == models.Dailytargets.user).all():
    db.delete(target)
    db.commit()
    db.close()

    print("deleted")

  


