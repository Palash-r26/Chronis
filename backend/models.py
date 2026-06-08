from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    linked_user_id = Column(String(10), default="U1")
    role = Column(String(50), default="user")
    profile_photo_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class BehavioralData(Base):
    __tablename__ = "behavioral_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(10), nullable=False, index=True)
    date = Column(Date, nullable=False)
    steps = Column(Integer)
    sleep_hours = Column(Float)
    screen_time_hours = Column(Float)
    deep_work_hours = Column(Float)
    exercise_minutes = Column(Integer)

class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    dark_mode = Column(Boolean, default=True)
    default_data_user = Column(String(10), default="U1")
    notifications_enabled = Column(Boolean, default=False)
    steps_in_k = Column(Boolean, default=True)
