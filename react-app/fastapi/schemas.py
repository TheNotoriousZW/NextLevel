from pydantic import BaseModel
from datetime import datetime

class UserUpdate(BaseModel):
  username: str
  points: int
  level: str

class userDt(BaseModel):
  username: str
  targetname: str
  start_time: datetime
  completed: bool
  consistency: float
  dailypoints: int
  origin: datetime
  bonus: int

class DtUpdate(BaseModel):
  target_name: str
  start_time: datetime
  completed: bool
  consistency: float
  bonus: int
  
