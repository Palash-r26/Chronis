# Chronis - Behavioral Analytics Web App

Chronis is a full-stack behavioral analytics web application that tracks daily data (sleep, steps, screen time, deep work, exercise) and surfaces meaningful insights, trends, and patterns through a modern UI.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL (SQLite for local dev), Passlib/Bcrypt, JWT

## Screenshots
*(Add screenshots here after deploying)*

## How to run locally

### 1. Backend Setup
1. Open a terminal in `chronis/backend`
2. Create virtual env: `python -m venv venv`
3. Activate virtual env:
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Start server: `uvicorn main:app --reload`
The backend will run at `http://localhost:8000`

### 2. Frontend Setup
1. Open another terminal in `chronis/frontend`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
The frontend will run at `http://localhost:5173`

### 3. Database Seeding
To populate the database with mock data and demo users (U1-U5):
1. In the `chronis` root folder, ensure the backend virtual environment is activated.
2. Run: `python -m backend.seed`
Demo user login: `user1@chronis.app` / password: `demo1234`

## Environment Variables
- Backend `.env`: `DATABASE_URL` (Defaults to SQLite `sqlite:///./chronis.db`), `SECRET_KEY`, `FRONTEND_URL`
- Frontend `.env`: `VITE_API_URL` (Defaults to `http://localhost:8000`)

## Deploy Instructions (Render)

### PostgreSQL Database
1. Create a PostgreSQL database on Render.
2. Copy the "Internal Database URL" (if backend is on Render) or "External Database URL".

### Web Service (Backend)
1. Connect your GitHub repo.
2. Root directory: `backend/`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Environment Variables:
   - `DATABASE_URL`: Your Render Postgres URL (Make sure it starts with `postgresql://` instead of `postgres://`)
   - `FRONTEND_URL`: Your deployed frontend URL

### Static Site (Frontend)
1. Root directory: `frontend/`
2. Build command: `npm install && npm run build`
3. Publish directory: `dist/`
4. Environment Variables:
   - `VITE_API_URL`: Your deployed backend URL

### Seeding Prod Database
In the Render shell for the backend service, run `python seed.py` (ensure imports in `seed.py` match production setup, which might require `python -m backend.seed`).
