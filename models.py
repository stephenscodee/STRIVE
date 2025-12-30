from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    metrics = relationship("PhysicalMetrics", back_populates="user")
    routines = relationship("Routine", back_populates="user")

class PhysicalMetrics(Base):
    __tablename__ = "physical_metrics"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    height = Column(Float)
    weight = Column(Float)
    body_fat_estimate = Column(Float)
    bmi = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="metrics")

class Routine(Base):
    __tablename__ = "routines"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    goal = Column(String)
    level = Column(String)
    frequency = Column(Integer)
    workouts = Column(JSON)  # Stores the routine structure as JSON
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="routines")
