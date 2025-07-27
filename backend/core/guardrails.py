# core/guardrails.py

# Basic input filter to only allow math-related questions
def check_input(question: str) -> bool:
    # Very simple filter (expand with NLP or regex if needed)
    math_keywords = ["solve", "calculate", "integrate", "derive", "value of", "limit", "equation"]
    return any(kw in question.lower() for kw in math_keywords)

# Add output checks later if needed (e.g., profanity filter)
