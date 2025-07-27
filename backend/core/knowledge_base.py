# core/knowledge_base.py
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer
import json
import os

# Load embedding model
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Connect to Qdrant (use in-memory for now)
qdrant = QdrantClient(":memory:")

COLLECTION_NAME = "math_kb"

def setup_knowledge_base():
    # 1. Create collection
    qdrant.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE)
    )

    # 2. Load dataset
    with open("data/math_dataset.json", "r") as f:
        data = json.load(f)

    points = []
    for item in data:
        vector = embedder.encode(item["question"]).tolist()
        points.append(PointStruct(
            id=int(item["id"]),
            vector=vector,
            payload=item
        ))

    qdrant.upsert(collection_name=COLLECTION_NAME, points=points)

def search_kb(question: str, top_k=1):
    vector = embedder.encode(question).tolist()
    results = qdrant.search(
        collection_name=COLLECTION_NAME,
        query_vector=vector,
        limit=top_k,
        score_threshold=0.7
    )

    if results:
        return results[0].payload["answer"]
    return None
