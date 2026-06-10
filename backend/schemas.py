from pydantic import BaseModel, EmailStr, Field
from datetime import date, datetime
from typing import Optional, List

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    linked_user_id: Optional[str] = None
    role: str
    profile_photo_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserSettingsUpdate(BaseModel):
    dark_mode: Optional[bool] = None
    default_data_user: Optional[str] = None
    notifications_enabled: Optional[bool] = None
    steps_in_k: Optional[bool] = None

class UserSettingsResponse(BaseModel):
    id: int
    user_id: int
    dark_mode: bool
    default_data_user: str
    notifications_enabled: bool
    steps_in_k: bool

    class Config:
        from_attributes = True

class BehavioralDataResponse(BaseModel):
    id: int
    user_id: str
    date: date
    steps: int
    sleep_hours: float
    screen_time_hours: float
    deep_work_hours: float
    exercise_minutes: int

    class Config:
        from_attributes = True
