# backend/routes/query.py

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from core.router import route_question
from dotenv import load_dotenv
import os

load_dotenv()  # loads variables from .env into os.environ

import google.generativeai as genai

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])


query_router = APIRouter()

class QueryRequest(BaseModel):
    question: str

@query_router.post("/query")
async def ask_question(req: QueryRequest):
    try:
        response = route_question(req.question)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
