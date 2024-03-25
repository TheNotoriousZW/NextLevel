from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
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
  