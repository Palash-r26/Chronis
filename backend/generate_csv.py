import csv
import random
from datetime import date, timedelta

# Users and base profiles
# U1: Average person
# U2: Night owl, high screen time, low exercise
# U3: Active, good sleep, high deep work
# U4: Erratic, high variance
# U5: Sedentary, long work hours
profiles = {
    'U1': {'steps': (5000, 10000), 'sleep': (6.5, 8.0), 'screen': (3.0, 6.0), 'deep': (2.0, 5.0), 'exercise': (0, 30)},
    'U2': {'steps': (2000, 6000), 'sleep': (5.0, 7.0), 'screen': (6.0, 10.0), 'deep': (1.0, 4.0), 'exercise': (0, 15)},
    'U3': {'steps': (8000, 15000), 'sleep': (7.0, 9.0), 'screen': (2.0, 5.0), 'deep': (4.0, 7.0), 'exercise': (30, 90)},
    'U4': {'steps': (1000, 12000), 'sleep': (4.0, 9.0), 'screen': (2.0, 12.0), 'deep': (0.0, 8.0), 'exercise': (0, 60)},
    'U5': {'steps': (1000, 4000), 'sleep': (6.0, 7.5), 'screen': (8.0, 12.0), 'deep': (5.0, 8.0), 'exercise': (0, 10)}
}

start_date = date(2026, 1, 1)

with open('behavioral_data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['user_id', 'date', 'steps', 'sleep_hours', 'screen_time_hours', 'deep_work_hours', 'exercise_minutes'])
    
    for user_id, p in profiles.items():
        for i in range(30):
            current_date = start_date + timedelta(days=i)
            # Add some correlation logic for insights:
            # - screen time > 6 hrs -> lower deep work
            # - exercise > 45 -> higher steps
            # - good sleep -> lower screen time previous day (simulated)
            
            screen_time = round(random.uniform(*p['screen']), 1)
            
            deep_base = random.uniform(*p['deep'])
            if screen_time > 6.0:
                deep_work = round(deep_base * 0.6, 1) # 40% drop
            else:
                deep_work = round(deep_base, 1)
                
            exercise = random.randint(*p['exercise'])
            steps_base = random.randint(*p['steps'])
            if exercise > 45:
                steps = steps_base + random.randint(3000, 5000)
            else:
                steps = steps_base
                
            sleep = round(random.uniform(*p['sleep']), 1)
            if screen_time < 4.0:
                sleep = min(sleep + 1.0, 9.0) # better sleep with low screen time
                
            # weekends (5 and 6)
            if current_date.weekday() >= 5:
                deep_work = round(deep_work * 0.2, 1) # low deep work on weekends
            elif current_date.weekday() in [2, 3]: # Wed/Thu peak
                deep_work = round(deep_work * 1.3, 1)
                
            writer.writerow([user_id, current_date.isoformat(), steps, sleep, screen_time, deep_work, exercise])

print("Generated behavioral_data.csv")
