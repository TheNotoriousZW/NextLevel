from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Float
from database import Base


class Users(Base):
  __tablename__ = 'users'

  email = Column(String, primary_key=True, index=True)
  username = Column(String, unique=True, index=True)
  hashed_password = Column(String, index=True)
  age = Column(Integer, index=True)
  gender = Column(String, index=True)
  level = Column(String, index=True)
  points = Column(Integer, index=True)
  

class Dailytargets(Base):
  __tablename__ = 'dailytargets'

  user = Column(String, ForeignKey("users.username"))
  target_name = Column(String, nullable=False, primary_key=True)
  start_time = Column(DateTime, nullable=False)
  completed = Column(Boolean, nullable=False)
  consistency = Column(Float)
  points = Column(Integer)
  origin = Column(DateTime, nullable=False)
  end_time = Column(DateTime)
  bonus = Column(Integer, default=False)
  
class Proactivetargets(Base):
  __tablename__ = 'proactivetargets'

  user = Column(String, ForeignKey("users.username"))
  target_name = Column(String, nullable=False, primary_key=True)
  start_time = Column(DateTime, nullable=False)
  completed = Column(Boolean, nullable=False)
  consistency = Column(Float)
  points = Column(Integer)
  origin = Column(DateTime, nullable=False)
  end_time = Column(DateTime)
  bonus = Column(Integer, default=False)
  

class Yearlytargets(Base):
  __tablename__ = 'yearlytargets'

  user = Column(String, ForeignKey("users.username"))
  target_name = Column(String, nullable=False, primary_key=True)
  start_time = Column(DateTime, nullable=False)
  completed = Column(Boolean, nullable=False)
  consistency = Column(Float)
  points = Column(Integer)
  origin = Column(DateTime, nullable=False)
  end_time = Column(DateTime)
  bonus = Column(Integer, default=False)
  
  
  
