import pandas as pd
from sqlalchemy.orm import Session
from .database import engine, Base, SessionLocal
from .models import User, BehavioralData, UserSettings
import bcrypt
from datetime import datetime
import os
from dotenv import load_dotenv
from sqlalchemy import text
load_dotenv()

def get_password_hash(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def seed_db():
    print("Dropping existing tables to reset schema...")
    with engine.connect() as conn:
        conn.execute(text("DROP TABLE IF EXISTS user_settings CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS behavioral_data CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS users CASCADE"))
        conn.commit()
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(User).first():
            print("Database already seeded.")
            return

        print("Seeding Users...")
        # Create U1-U5 users
        for i in range(1, 6):
            user_id = f"U{i}"
            user = User(
                name=f"Demo User {i}",
                email=f"user{i}@chronis.app",
                password_hash=get_password_hash("demo1234"),
                linked_user_id=user_id
            )
            db.add(user)
            db.flush() # flush to get user.id
            
            settings = UserSettings(user_id=user.id, default_data_user=user_id)
            db.add(settings)

        print("Seeding Behavioral Data...")
        # Load CSV
        df = pd.read_csv("Chronis_TaskA_Synthetic_Behavioral_Data_v2-2.csv")
        
        for index, row in df.iterrows():
            record = BehavioralData(
                user_id=row['user_id'],
                date=datetime.strptime(row['date'], '%Y-%m-%d').date(),
                steps=int(row['steps']),
                sleep_hours=float(row['sleep_hours']),
                screen_time_hours=float(row['screen_time_hours']),
                deep_work_hours=float(row['deep_work_hours']),
                exercise_minutes=int(row['exercise_minutes'])
            )
            db.add(record)

        db.commit()
        print("Database seeding completed successfully.")

    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
