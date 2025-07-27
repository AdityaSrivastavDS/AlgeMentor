import React, { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import AnswerDisplay from "./components/AnswerDisplay";
import FeedbackForm from "./components/FeedbackForm";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async (input) => {
    setQuestion(input);
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data);
    } catch (err) {
      setError("Failed to get a response. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (feedbackData) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });
      alert("Feedback submitted. Thank you!");
    } catch (err) {
      alert("Failed to send feedback.");
    }
  };

  return (
    <div className="App">
      <h1>🧮 Math Routing Agent</h1>
      <QuestionForm onAsk={handleAsk} />
      {loading && <p>⏳ Thinking...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {answer && (
        <>
          <AnswerDisplay answer={answer} />
          <FeedbackForm
            question={question}
            answer={answer.final_answer}
            onSubmit={handleFeedback}
          />
        </>
      )}
    </div>
  );
}

export default App;
