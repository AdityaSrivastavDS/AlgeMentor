import React from "react";

function AnswerDisplay({ answer }) {
  if (!answer) return null;

  return (
    <div style={{ marginTop: "20px", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>🧠 Final Answer:</h3>
      <p>{answer.final_answer}</p>

      <h4>🔍 Reasoning:</h4>
      <p>{answer.reasoning}</p>

      <h4>📚 Source:</h4>
      <p>{answer.source}</p>

      <h4>✅ Confidence:</h4>
      <p>{answer.confidence}</p>

      {answer.used_web && (
        <>
          <h4>🌐 Used Web:</h4>
          <p>{answer.used_web.toString()}</p>
        </>
      )}

      {answer.related_kb?.length > 0 && (
        <>
          <h4>📘 Related Knowledge Base:</h4>
          <ul>
            {answer.related_kb.map((kb, index) => (
              <li key={index}>{kb}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AnswerDisplay;
