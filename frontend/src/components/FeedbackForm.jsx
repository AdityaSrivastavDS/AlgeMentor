import React, { useState } from "react";

function FeedbackForm({ question, answer }) {
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;

    await fetch("http://localhost:8000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        answer,
        rating: Number(rating),
        comments,
      }),
    });

    setSent(true);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {sent ? (
        <p>✅ Thanks for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Rate the answer: </label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Select</option>
            <option value="5">Correct</option>
            <option value="3">Incomplete</option>
            <option value="2">Unclear</option>
            <option value="1">Wrong</option>
          </select>

          <br />
          <label>Comments (optional): </label>
          <input
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            style={{ marginLeft: "10px", width: "60%" }}
          />
          <br />
          <button type="submit" style={{ marginTop: "10px" }}>
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}


export default FeedbackForm;
