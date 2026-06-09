from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models import User, BehavioralData, UserSettings
from auth import get_current_user
from schemas import UserResponse

router = APIRouter()

# Dependency to check if current user is admin
def get_admin_user(current_user: User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough privileges to perform this action"
        )
    return current_user

# Schemas for Admin
class AdminUserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None

class UserStats(BaseModel):
    total_steps: int
    avg_sleep: float
    avg_screen_time: float
    total_records: int

# Routes
@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db), 
    admin: User = Depends(get_admin_user)
):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.get("/users/{user_id}/stats", response_model=UserStats)
def get_user_stats(
    user_id: int, 
    db: Session = Depends(get_db), 
    admin: User = Depends(get_admin_user)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    records = db.query(BehavioralData).filter(BehavioralData.user_id == user.linked_user_id).all()
    
    if not records:
        return UserStats(total_steps=0, avg_sleep=0.0, avg_screen_time=0.0, total_records=0)
        
    total_steps = sum(r.steps for r in records if r.steps)
    avg_sleep = sum(r.sleep_hours for r in records if r.sleep_hours) / len(records)
    avg_screen = sum(r.screen_time_hours for r in records if r.screen_time_hours) / len(records)
    
    return UserStats(
        total_steps=total_steps,
        avg_sleep=round(avg_sleep, 2),
        avg_screen_time=round(avg_screen, 2),
        total_records=len(records)
    )

@router.put("/users/{user_id}", response_model=UserResponse)
def update_user_admin(
    user_id: int, 
    update_data: AdminUserUpdate, 
    db: Session = Depends(get_db), 
    admin: User = Depends(get_admin_user)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if update_data.name is not None:
        user.name = update_data.name
    if update_data.role is not None:
        user.role = update_data.role
        
    db.commit()
    db.refresh(user)
    return user

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int, 
    db: Session = Depends(get_db), 
    admin: User = Depends(get_admin_user)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own admin account")
        
    # Delete User Settings
    db.query(UserSettings).filter(UserSettings.user_id == user.id).delete()
    
    # Delete Behavioral Data (Linked to user.linked_user_id)
    if user.linked_user_id:
        db.query(BehavioralData).filter(BehavioralData.user_id == user.linked_user_id).delete()
        
    # Delete User
    db.delete(user)
    db.commit()
    
    return {"message": "User and all associated data deleted successfully"}
