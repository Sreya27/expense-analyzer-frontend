import React from "react";
import "../styles/Insights.css";

const Insights = ({ insightsData}) => {
  return (
    <div className="insights-container">
      <div className="header">
        <h1>Spending Optimization Analysis</h1>
      </div>

      <div className="grid-container">
        {insightsData.ActionableInsights.map((insight, index) => (
          <div key={index} className="insight-card">
            <div className="card-header">
              <h2>{insight.Category}</h2>
            </div>

            <div className="spending-details">
              
              <div className="spending">
              <p style={{ color: 'RED' }}>Current Spending</p>
                <h3>₹{insight.Actual_Spending.toLocaleString()}</h3>
              </div>
              <div className="budget">
                <p style={{ color: 'green' }}>Recommended Budget</p>
                <h3 className="budget-amount" style={{ color: 'green' }}>₹{insight.Budget_Limit.toLocaleString()}</h3>

              </div>
              
            </div>
            <p className="recommendation"><strong>Recommendation:</strong> {insight.Optimized_Spending}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
