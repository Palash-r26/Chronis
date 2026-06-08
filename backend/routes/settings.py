from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, UserSettings
from schemas import UserSettingsUpdate, UserSettingsResponse
from auth import get_current_user

router = APIRouter()

@router.get("/{user_id}", response_model=UserSettingsResponse)
def get_settings(user_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # To keep it simple, we just use the current_user's settings. In a real app we might check permissions
    settings = db.query(UserSettings).filter(UserSettings.user_id == current_user.id).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings

@router.put("/{user_id}", response_model=UserSettingsResponse)
def update_settings(user_id: str, settings_update: UserSettingsUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    settings = db.query(UserSettings).filter(UserSettings.user_id == current_user.id).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
        
    update_data = settings_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(settings, key, value)
        
    # if user updates default data user, we should also update the User's linked_user_id for convenience
    if 'default_data_user' in update_data:
        current_user.linked_user_id = update_data['default_data_user']
        db.add(current_user)
        
    db.commit()
    db.refresh(settings)
    return settings
