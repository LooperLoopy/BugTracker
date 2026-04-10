BugTracker

What it is
- Bug-tracking app with a FastAPI backend and a Next.js frontend.

How to run


- Backend:
	1. Change into the backend directory: `cd backend`
	2. Create a virtual environment: `python -m venv venv`
	3. Activate the virtual environment:
		 - Windows: `venv\\Scripts\\activate`
		 - macOS / Linux: `source venv/bin/activate`
	4. Install dependencies: `pip install -r requirements.txt`
	5. Start the server: `uvicorn app.main:app --reload`

- Frontend:
	1. Change into the frontend app directory: `cd frontend/bug-tracker`
	2. Install dependencies: `npm install`
	3. Start the dev server: `npm run dev`

