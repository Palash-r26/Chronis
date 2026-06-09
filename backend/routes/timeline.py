from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, BehavioralData
from auth import get_current_user
from typing import Optional
from datetime import date

router = APIRouter()

@router.get("/{user_id}")
def get_timeline(
    user_id: str, 
    start: Optional[date] = Query(None), 
    end: Optional[date] = Query(None), 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin" and user_id != current_user.linked_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this data profile")

    query = db.query(BehavioralData).filter(BehavioralData.user_id == user_id)
    if start:
        query = query.filter(BehavioralData.date >= start)
    if end:
        query = query.filter(BehavioralData.date <= end)
        
    data = query.order_by(BehavioralData.date).all()
    
    # Calculate averages for day score comparison
    if data:
        avg_steps = sum(d.steps for d in data) / len(data)
        avg_sleep = sum(d.sleep_hours for d in data) / len(data)
        avg_screen = sum(d.screen_time_hours for d in data) / len(data)
        avg_deep = sum(d.deep_work_hours for d in data) / len(data)
        avg_exercise = sum(d.exercise_minutes for d in data) / len(data)
    else:
        avg_steps = avg_sleep = avg_screen = avg_deep = avg_exercise = 0

    timeline = []
    for d in data:
        # Simple day score logic
        score = 0
        if d.steps > avg_steps: score += 1
        if d.sleep_hours > avg_sleep: score += 1
        if d.screen_time_hours < avg_screen: score += 1
        if d.deep_work_hours > avg_deep: score += 1
        if d.exercise_minutes > avg_exercise: score += 1
        
        is_above_average = score >= 3
        
        timeline.append({
            "date": d.date.isoformat(),
            "steps": d.steps,
            "sleep_hours": d.sleep_hours,
            "screen_time_hours": d.screen_time_hours,
            "deep_work_hours": d.deep_work_hours,
            "exercise_minutes": d.exercise_minutes,
            "day_score": score,
            "is_above_average": is_above_average
        })
        
    return timeline
