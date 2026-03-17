# Setup:
```text
cd into the backend
python -m venv venv
pip install -r requirements.txt
create and populate env file with your stuff
DATABASE_URL = "database-url-string-here"
```
# Running the server:
```text
uvicorn main:app
```
# Architecture
Scenario: User requests to create a new report
```text
User Request
  │  (Get request, so tells us to use GET route)
  ▼
Route
  │  (Validates report fields, create DB session, pass both to service function)
  ▼
Service
  │  (Saves report to database)
  ▼
Database
```
```text
BugTracker/
└─ backend/
   ├─ main.py
   ├─ Datamodels.py
   ├─ Database.py
   ├─ routes/
   ├─ services/
   └─ schemas/
```
- `main.py` — Starts the FastAPI server  
- `Datamodels.py` — Defines schema for DB tables  
- `Database.py` — Instantiates DB connection and provides getter for sessions  
- `routes/` — Endpoints for different user requests  
- `services/` — Business logic functions  
- `schemas/` — Pydantic models for request/response validation
