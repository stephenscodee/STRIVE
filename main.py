from fastapi import FastAPI
from backend.routers import endpoints

app = FastAPI(title="Looq Fitness API")

app.include_router(endpoints.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Looq Fitness API"}
