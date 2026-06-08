from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserResponse
from auth import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class UserUpdate(BaseModel):
    name: Optional[str] = None
    profile_photo_url: Optional[str] = None

@router.get("/me", response_model=UserResponse)
def get_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserResponse)
def update_user_me(user_update: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if user_update.name:
        current_user.name = user_update.name
    if user_update.profile_photo_url is not None:
        current_user.profile_photo_url = user_update.profile_photo_url
        
    db.commit()
    db.refresh(current_user)
    return current_user
