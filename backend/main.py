from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import auth, dashboard, insights, timeline, settings, users, admin
import os
from dotenv import load_dotenv
load_dotenv()

# Create database tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Chronis API")

# Configure CORS
origins = [
    os.getenv("FRONTEND_URL", "https://chronis-palash.vercel.app"),
    "https://chronis-palash.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
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
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Chronis API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
