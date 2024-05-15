from pydantic import BaseModel
from datetime import datetime

class UserUpdate(BaseModel):
  username: str
  points: int
  level: str

class userTarg(BaseModel):
  username: str
  targetname: str
  start_time: datetime
  completed: bool
  consistency: float
  points: int
  origin: datetime
  bonus: int

class targUpdate(BaseModel):
  target_name: str
  id: int
  start_time: datetime
  completed: bool
  consistency: float
  bonus: int
  points: int
  
