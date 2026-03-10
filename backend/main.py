from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"Message": "Hello Wilson"}

app.include_router(report_router)