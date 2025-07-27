import React, { useState } from "react";

function FeedbackForm({ question, answer }) {
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) return alert("Please select a rating.");

    const payload = {
      question,
      answer,
      rating: parseInt(rating), // ensure it's a number
      comments,
    };

    try {
      const res = await fetch("http://localhost:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        alert(`Error: ${data.detail}`);
      }
    } catch (err) {
      alert("Failed to submit feedback.");
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {sent ? (
        <p>✅ Thanks for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Rate the answer (1 to 5): </label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="">Select</option>
              <option value="5">Excellent</option>
              <option value="4">Good</option>
              <option value="3">Average</option>
              <option value="2">Poor</option>
              <option value="1">Wrong/Unclear</option>
            </select>
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>Comments (optional): </label>
            <input
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={{ width: "70%", padding: "5px" }}
            />
          </div>
          <button type="submit" style={{ marginTop: "10px", padding: "6px 12px" }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;
