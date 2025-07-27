# core/llm_tools.py

import os
import google.generativeai as genai
from typing import Literal

# Setup Gemini key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# ======================
# Prompt Templates
# ======================

PROMPT_TEMPLATES = {
    "solve": "Solve the following math problem step-by-step: {question}",
    "explain": "Explain the solution for: {question}",
    "simplify": "Simplify and solve: {question}"
}

# ======================
# Gemini Wrapper
# ======================

def call_gemini(prompt: str, model_name: str = "gemini-2.0-flash") -> str:
    """
    Calls Gemini model with the given prompt.
    """
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"[Gemini ERROR] {e}")
        return "Sorry, Gemini couldn't process that right now."
# ======================
# Simplification Strategy
# ======================

def simplify_math_question(question: str, strategy: Literal["solve", "explain", "simplify"] = "simplify") -> dict:
    """
    Chooses a prompt based on the strategy and returns model output.
    """
    prompt = PROMPT_TEMPLATES.get(strategy, PROMPT_TEMPLATES["simplify"]).format(question=question)
    answer = call_gemini(prompt)

    return {
        "final_answer": answer,
        "source": "gemini_simplifier",
        "reasoning": "LLM-based reasoning",
        "confidence": 0.95,
        "used_web": False
    }
