import React, { useState } from "react";

function QuestionForm({ onAsk }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAsk(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Ask a math question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "70%", padding: "8px" }}
      />
      <button type="submit" style={{ padding: "8px 12px" }}>
        Ask
      </button>
    </form>
  );
}

export default QuestionForm;
