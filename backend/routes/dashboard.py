from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import timedelta
from database import get_db
from models import User, BehavioralData
from auth import get_current_user

router = APIRouter()

@router.get("/{user_id}")
def get_dashboard_metrics(user_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Validate user exists
    if not db.query(BehavioralData).filter(BehavioralData.user_id == user_id).first():
        raise HTTPException(status_code=404, detail="No data found for user")

    # Averages
    avgs = db.query(
        func.avg(BehavioralData.steps).label('steps'),
        func.avg(BehavioralData.sleep_hours).label('sleep'),
        func.avg(BehavioralData.screen_time_hours).label('screen_time'),
        func.avg(BehavioralData.deep_work_hours).label('deep_work'),
        func.avg(BehavioralData.exercise_minutes).label('exercise')
    ).filter(BehavioralData.user_id == user_id).first()

    # Recent Changes (Compare last 7 days vs previous 7 days)
    # Since we have static 30 day data, we can just grab max date
    max_date = db.query(func.max(BehavioralData.date)).filter(BehavioralData.user_id == user_id).scalar()
    
    recent_changes = []
    if max_date:
        week1_start = max_date - timedelta(days=6)
        week2_start = max_date - timedelta(days=13)
        
        w1_avg_sleep = db.query(func.avg(BehavioralData.sleep_hours)).filter(BehavioralData.user_id == user_id, BehavioralData.date >= week1_start).scalar() or 0
        w2_avg_sleep = db.query(func.avg(BehavioralData.sleep_hours)).filter(BehavioralData.user_id == user_id, BehavioralData.date >= week2_start, BehavioralData.date < week1_start).scalar() or 0
        
        if w2_avg_sleep > 0:
            change_pct = ((w1_avg_sleep - w2_avg_sleep) / w2_avg_sleep) * 100
            recent_changes.append({
                "metric": "Sleep",
                "change_pct": round(abs(change_pct), 1),
                "direction": "improved" if change_pct > 0 else "worsened"
            })

    # Confidence calculation
    days_tracked = db.query(BehavioralData).filter(BehavioralData.user_id == user_id).count()
    
    return {
        "averages": {
            "steps": int(avgs.steps or 0),
            "sleep": round(avgs.sleep or 0, 1),
            "screen_time": round(avgs.screen_time or 0, 1),
            "deep_work": round(avgs.deep_work or 0, 1),
            "exercise": int(avgs.exercise or 0)
        },
        "weekly_trends": [], # Chart data will be fetched by timeline or we can send it here
        "recent_changes": recent_changes,
        "confidence": {
            "days_tracked": days_tracked,
            "completeness_pct": 100 if days_tracked == 30 else round((days_tracked/30)*100)
        }
    }
