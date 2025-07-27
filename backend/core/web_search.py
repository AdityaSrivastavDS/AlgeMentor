# core/web_search.py
import os
import requests

SERPER_API_KEY = os.getenv("SERPER_API_KEY")

def search_web(question: str) -> str:
    url = "https://google.serper.dev/search"
    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json"
    }
    data = { "q": question }

    response = requests.post(url, headers=headers, json=data)
    results = response.json()

    if "organic" in results:
        # Get the first result snippet
        for item in results["organic"]:
            if "snippet" in item:
                return item["snippet"]
    return "No reliable answer found online."
