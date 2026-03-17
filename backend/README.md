## Setup:
# create virtual environment
```text
cd into the backend
python -m venv venv
```
# activate venv
**On macOS / Linux**
```text
source venv/bin/activate
```
**on windows**
```text
venv\Scripts\activate
```
# install requirements into venv
```text
pip install -r requirements.txt
```
# Running the server:
```text
uvicorn app.main:app
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
