# core/router.py

from core.llm_tools import simplify_math_question
from core.web_search import search_web

def route_question(question: str) -> dict:
    """
    Routes question to LLM or Web based on logic.
    """
    try:
        # Step 1: Try Gemini first
        llm_result = simplify_math_question(question)

        # If Gemini fails to give a reasonable response, use web
        if not llm_result["final_answer"] or "couldn't process" in llm_result["final_answer"].lower():
            web_result = search_web(question)
            return {
                "final_answer": web_result,
                "source": "web_search",
                "reasoning": "Fetched from web using Serper",
                "confidence": 0.70,
                "used_web": True,
                "related_kb": []
            }

        # Gemini gave a good result
        return {
            **llm_result,
            "related_kb": [],
            "used_web": False
        }

    except Exception as e:
        return {
            "final_answer": "An error occurred while processing your query.",
            "source": "error_handler",
            "reasoning": str(e),
            "confidence": 0.0,
            "related_kb": [],
            "used_web": False
        }
