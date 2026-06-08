from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import auth, dashboard, insights, timeline, settings, users
import os
from dotenv import load_dotenv
load_dotenv()

# Create database tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Chronis API")

# Configure CORS
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:5173"), # default vite port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(insights.router, prefix="/api/insights", tags=["insights"])
app.include_router(timeline.router, prefix="/api/timeline", tags=["timeline"])
app.include_router(settings.router, prefix="/api/settings", tags=["settings"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Chronis API"}
