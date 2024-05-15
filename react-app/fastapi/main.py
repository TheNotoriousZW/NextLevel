from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import models
from database import engine, sessionLocal, get_db
from sqlalchemy.orm import Session
import auth
from schemas import UserUpdate, userTarg, targUpdate
from sqlalchemy import update
from auth import get_current_user, Users
from datetime import datetime, timedelta
import schedule
import threading
import time


def update_targets(table, time):

  db = sessionLocal()

  
  try:

    targets = db.query(table).all()
    
    for target in targets:
      start_time = datetime.strptime(f"{target.start_time}", "%Y-%m-%d %H:%M:%S.%f")
      current_time = datetime.now()
      time_difference = current_time - start_time

      

      if time_difference >= timedelta(seconds=time) and target.completed:
       target = db.query(table).filter(target.id == table.id).first()
       now = datetime.now()
       sql_timestamp = now.strftime('%Y-%m-%d %H:%M:%S.%f')

       target.start_time = sql_timestamp
       target.completed = False
       target.consistency += 0.2

       if target.consistency >= 1:
         target.points =  (target.consistency * 2) + target.points
         target.points =  round(target.points)

       db.commit()
    
      elif time_difference >= timedelta(seconds=time) and not target.completed:
        now = datetime.now()
        sql_timestamp = now.strftime('%Y-%m-%d %H:%M:%S.%f')

        user = db.query(models.Users).filter(target.user == models.Users.username).first()
        
        target.start_time = sql_timestamp
        target.completed = False
        target.consistency -= 0.4
        user.points -= target.points
        print(f"-{target.points} points")

        if target.consistency < 0:
          target.consistency = 0
          target.points = target.points  

        db.commit()
        
  except Exception as e:
    
    db.rollback()
    print(f'{e} occured')

  finally:
    db.close()

  print("time updated")

def scheduler(task, *args):
  schedule.every(45).seconds.do(task,*args)

  while True:
    schedule.run_pending()
    time.sleep(1)

dtarget_set = threading.Thread(target=scheduler, args=(update_targets,models.Dailytargets, 10))
dtarget_set.start()

ptarget_set = threading.Thread(target=scheduler, args=(update_targets,models.Proactivetargets, 30))
ptarget_set.start()

ytarget_set = threading.Thread(target=scheduler, args=(update_targets,models.Yearlytargets, 60))
ytarget_set.start()

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
def add_target(target: userTarg, db: Session = Depends(get_db)):
  daily_target = models.Dailytargets(user=target.username, target_name=target.targetname, consistency=target.consistency, start_time=target.start_time, completed=target.completed, points=target.points, origin=target.origin, bonus=target.bonus)
  db.add(daily_target)
  db.commit()
  instance = db.query(models.Dailytargets).filter(target.targetname == models.Dailytargets.target_name and target.username == models.Dailytargets).first()
  db.close()
  return instance

@app.post('/userPt')
def add_target(target: userTarg, db: Session = Depends(get_db)):
  proactive_target = models.Proactivetargets(user=target.username, target_name=target.targetname, consistency=target.consistency, start_time=target.start_time, completed=target.completed, points=50, origin=target.origin, bonus=target.bonus)
  db.add(proactive_target)
  db.commit()
  instance = db.query(models.Proactivetargets).filter(target.targetname == models.Proactivetargets.target_name and target.username == models.Proactivetargets).first()
  db.close()
  return instance

@app.post('/userYt')
def add_target(target: userTarg, db: Session = Depends(get_db)):
  yearly_target = models.Yearlytargets(user=target.username, target_name=target.targetname, consistency=target.consistency, start_time=target.start_time, completed=target.completed, points=1500, origin=target.origin, bonus=target.bonus)
  db.add(yearly_target)
  db.commit()
  instance = db.query(models.Yearlytargets).filter(target.targetname == models.Yearlytargets.target_name and target.username == models.Yearlytargets).first()
  db.close()
  return instance

@app.get('/userDtarg')
def get_target(username , db: Session = Depends(get_db)):
  dailyTargets = db.query(models.Dailytargets).filter(username == models.Dailytargets.user).all()
  return dailyTargets

@app.get('/userPtarg')
def get_target(username , db: Session = Depends(get_db)):
  proactiveTargets = db.query(models.Proactivetargets).filter(username == models.Proactivetargets.user).all()
  return proactiveTargets

@app.get('/userYtarg')
def get_target(username , db: Session = Depends(get_db)):
  yearlyTargets = db.query(models.Yearlytargets).filter(username == models.Yearlytargets.user).all()
  return yearlyTargets

@app.put('/Dt')
def update_target(target: targUpdate,db: Session = Depends(get_db)):
  dt = db.query(models.Dailytargets).filter(target.id == models.Dailytargets.id).first()
  dt.completed = target.completed
  dt.consistency = target.consistency
  dt.start_time = target.start_time
  dt.bonus = target.bonus
  dt.points = target.points
  db.add(dt)
  db.commit()
  db.close()

@app.put('/Pt')
def update_target(target: targUpdate,db: Session = Depends(get_db)):
  pt = db.query(models.Proactivetargets).filter(target.id == models.Proactivetargets.id).first()
  pt.completed = target.completed
  pt.consistency = target.consistency
  pt.start_time = target.start_time
  pt.bonus = target.bonus
  pt.points = target.points
  db.add(pt)
  db.commit()
  db.close()

@app.put('/Yt')
def update_target(target: targUpdate,db: Session = Depends(get_db)):
  yt = db.query(models.Yearlytargets).filter(target.id == models.Yearlytargets.id).first()
  yt.completed = target.completed
  yt.consistency = target.consistency
  yt.start_time = target.start_time
  yt.bonus = target.bonus
  yt.points = target.points
  db.add(yt)
  db.commit()
  db.close()

@app.delete('/rmDt/{username}')
def clear_targets(username: str, db: Session = Depends(get_db)):

  for target in db.query(models.Dailytargets).filter(username == models.Dailytargets.user).all():
    db.delete(target)
    db.commit()
    db.close()

    print("deleted")

@app.delete('/rmPt/{username}')
def clear_targets(username: str, db: Session = Depends(get_db)):

  for target in db.query(models.Proactivetargets).filter(username == models.Proactivetargets.user).all():
    db.delete(target)
    db.commit()
    db.close()

    print("deleted")

@app.delete('/rmYt/{username}')
def clear_targets(username: str, db: Session = Depends(get_db)):

  for target in db.query(models.Yearlytargets).filter(username == models.Yearlytargets.user).all():
    db.delete(target)
    db.commit()
    db.close()

    print("deleted")
  


