# BugTracker

## What it is
A bug-tracking app with a FastAPI backend and a Next.js frontend. This project was made for the CPS406 - 'Introduction to Software Engineering' Course

<img width="1348" height="735" alt="image" src="https://github.com/user-attachments/assets/0673db23-9ff8-4024-b340-e0186777af84" />

## How to Run

### Backend

1. Change into the backend directory:
   cd backend

2. Create a virtual environment:
   python -m venv venv

3. Activate the virtual environment:

   - Windows:
     venv\Scripts\activate

   - macOS / Linux:
     source venv/bin/activate

4. Install dependencies:
   pip install -r requirements.txt

5. Start the server:
   uvicorn app.main:app --reload

---

### Frontend

1. Change into the frontend directory:
   cd frontend/bug-tracker

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev
