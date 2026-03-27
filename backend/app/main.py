from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import db_instance
from app.routes.report_routes import router as report_router
from app.routes.user_routes import router as user_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"Message": "Hello Wilson"}

app.include_router(report_router)
app.include_router(user_router)

if __name__ == "__main__":
    import uvicorn
    print("Starting server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)