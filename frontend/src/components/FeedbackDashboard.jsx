// frontend/src/components/FeedbackDashboard.jsx

import React, { useEffect, useState } from 'react';
import './FeedbackDashboard.css';

const FeedbackDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/feedback/all')
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching feedback:', err);
        setLoading(false);
      });
  }, []);

  const avgRating = (
    feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length
  ).toFixed(2);

  return (
    <div className="dashboard-container">
      <h2>Feedback Dashboard</h2>
      {loading ? (
        <p>Loading feedback...</p>
      ) : (
        <>
          <p>Average Rating: {avgRating} ⭐</p>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Question</th>
                <th>Rating</th>
                <th>Model Used</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((fb, i) => (
                <tr key={i}>
                  <td>{new Date(fb.timestamp).toLocaleString()}</td>
                  <td>{fb.question}</td>
                  <td>{fb.rating}</td>
                  <td>{fb.model_used}</td>
                  <td>{fb.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default FeedbackDashboard;
