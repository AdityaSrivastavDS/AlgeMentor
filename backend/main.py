# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.query import query_router
from routes.feedback import feedback_router
import os
import uvicorn


app = FastAPI(title="Math Routing Agent")

# Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, set to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(query_router)
app.include_router(feedback_router)

@app.get("/")
def read_root():
    return {"message": "Math Routing Agent is running!"}

# Add at the end of main.py
from core.knowledge_base import setup_knowledge_base

@app.on_event("startup")
def startup_event():
    setup_knowledge_base()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # 10000 for local dev
    uvicorn.run("main:app", host="0.0.0.0", port=port)