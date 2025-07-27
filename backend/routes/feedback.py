# backend/routes/feedback.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
import json
import os

feedback_router = APIRouter()

FEEDBACK_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "feedback.json")

class FeedbackRequest(BaseModel):
    question: str
    answer: str
    rating: int  # 1 to 5
    comments: str = None

@feedback_router.post("/feedback")
async def collect_feedback(feedback: FeedbackRequest):
    try:
        new_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "question": feedback.question,
            "answer": feedback.answer,
            "rating": feedback.rating,
            "comments": feedback.comments or ""
        }

        if not os.path.exists(FEEDBACK_FILE):
            with open(FEEDBACK_FILE, "w") as f:
                json.dump([new_entry], f, indent=2)
        else:
            with open(FEEDBACK_FILE, "r+") as f:
                data = json.load(f)
                data.append(new_entry)
                f.seek(0)
                json.dump(data, f, indent=2)

        return {"message": "Feedback recorded successfully."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
