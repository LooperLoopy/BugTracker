from fastapi import FastAPI
from app.database.database import db_instance
from app.routes.report_routes import router as report_router
from app.routes.user_routes import router as user_router

app = FastAPI()

@app.get("/")
async def root():
    return {"Message": "Hello Wilson"}

app.include_router(report_router)
app.include_router(user_router)