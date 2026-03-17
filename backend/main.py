from fastapi import FastAPI
from backend.database.database import db_instance
from backend.routes.report_routes import report_router
from backend.routes.user_routes import user_router

app = FastAPI()

@app.get("/")
async def root():
    return {"Message": "Hello Wilson"}

app.include_router(report_router)
app.include_router(user_router)