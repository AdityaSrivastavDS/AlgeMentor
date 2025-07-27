# 🧠 AlgeMentor (Math Routing Agent)
An AI-powered system that intelligently routes math queries through specialized modules using an Agentic RAG architecture with feedback loops, vector search, and web augmentation. Designed for adaptive math assistance.

---

## 📌 Features
- 🔍 Semantic Retrieval: Uses vector search for math question retrieval.

- 🧠 LLM Reasoning Engine: Routes questions to appropriate simplifiers or solvers.

- 🔗 Web-Augmented RAG: Enriches answers using external sources.

- 🛡️ Guardrails: Validates safety, topic relevance, and hallucination detection.

- 🔁 Human-in-the-loop Feedback: Captures reviewer feedback and closes the loop.

- 🚀 Built with FastAPI, Sentence Transformers, Qdrant, and LangChain.

---

## 🏗️ Architecture

```
                       +---------------------------+
                       |   FastAPI Backend (main)  |
                       +---------------------------+
                                 |
                                 v
                      +------------------------+
                      |   /query (POST route)  |
                      +------------------------+
                                 |
             -------------------------------------------
            |                         |                 |
     +--------------+       +-----------------+   +----------------+
     | Search KB    |       | Web Search RAG  |   | LLM Simplifier |
     | (Qdrant)     |       | (Serper API)    |   | (OpenAI, etc.) |
     +--------------+       +-----------------+   +----------------+
            |                         |                 |
            +------------> Merge + Validation <---------+
                                 |
                        +------------------+
                        | Feedback Capture |
                        +------------------+
```
---

## 📦 Installation

```bash
git clone https://github.com/AdityaSrivastavDS/AlgeMentor
cd math-routing-agent/backend

# Recommended: Create a virtual environment
conda create -n mathagent python=3.10 -y
conda activate mathagent

# Install dependencies
pip install -r requirements.txt

# Also install tf-keras to avoid transformer-Keras 3 incompatibility
pip install tf-keras

# Start the FastAPI server
uvicorn main:app --reload

#Start the React Development 
cd frontend
npm install
npm start
```
--- 

## 🔐 Environment Variables
Create a .env file in your root with:
```bash
SERPER_API_KEY=your_serper_key
OPENAI_API_KEY=your_openai_key
```
---

## � Project Structure

```
math_routing_agent/
├── README.md                    # Project documentation
├── requirements.txt             # Python dependencies
├── backend/                     # FastAPI backend
│   ├── main.py                 # FastAPI app entry point
│   ├── core/                   # Core business logic
│   │   ├── guardrails.py       # Safety & validation checks
│   │   ├── knowledge_base.py   # Vector database operations
│   │   ├── mcp.py             # Model Context Protocol
│   │   ├── router.py          # Query routing logic
│   │   └── web_search.py      # Web search integration
│   ├── data/                   # Data storage
│   │   └── math_dataset.json  # Math problems dataset
│   └── routes/                 # API route handlers
│       ├── feedback.py         # Feedback collection
│       └── query.py           # Query processing
└── frontend/                   # React frontend (optional)
    ├── package.json           # Node.js dependencies
    ├── public/
    │   └── index.html         # HTML template
    └── src/
        ├── App.js             # Main React component
        ├── App.css            # Styling
        ├── index.js           # React entry point
        └── components/        # React components
            ├── AnswerDisplay.jsx    # Display responses
            ├── FeedbackForm.jsx     # Feedback collection
            └── QuestionForm.jsx     # Query input form
```

---

## 📩 Sample API Request

```bash
POST /query
Content-Type: application/json

{
  "question": "What is the solution to 2x + 5 = 13?"
}
```
---

## ✅ Sample Response

```bash
{
  "final_answer": "x = 4",
  "source": "llm_simplifier",
  "reasoning": "Subtracted 5, then divided by 2",
  "confidence": 0.95,
  "related_kb": [...],
  "used_web": false
}
```
---

### 📌 Future Improvements
- Add student profiles for personalization

- Frontend (React + Chart.js) for visual insights

- Caching and cost optimization




