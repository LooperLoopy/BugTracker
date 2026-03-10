from fastapi import FastAPI
from .database import db_instance

app = FastAPI()

@app.get("/")
async def root():
    return {"Message": "Hello Wilson"}

app.include_router(report_router)