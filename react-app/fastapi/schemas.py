from pydantic import BaseModel

class UserUpdate(BaseModel):
  username: str
  points: int
  level: str