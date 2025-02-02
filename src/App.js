import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { BASE_URL, CREATE_USER } from "./constant/endpoint";
import Insights from "./pages/Insights";
import { insights as dummyInsights } from "./constant/insights";

function App() {

  const [username, setUsername
  ] = useState("");
  const [salary, setSalary] = useState("");
  const [goal, setGoal] = useState("");
  const [timeline, setTimeline] = useState("");
  const [insights, setInsights] = useState(dummyInsights);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    salary: "",
    goal: "",
    timeline: "",
  });

  const validateUsername = (value) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username
  : "Please enter your username",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username
  : "",
      }));
    }
  };

  const validateSalary = (value) => {
    if (!value || isNaN(value) || value <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        salary: "Please enter a valid salary.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        salary: "",
      }));
    }
  };

  const validateGoal = (value) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        goal: "Please enter a financial goal.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        goal: "",
      }));
    }
  };

  const validateTimeline = (value) => {
    if (!value || isNaN(value) || value <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        timeline: "Please enter a valid timeline in weeks.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        timeline: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.username
 || errors.salary || errors.goal || errors.timeline) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/${CREATE_USER}`, {
        username
  ,
        salary,
        goal,
        timeline,
      });
      setInsights(response.data);
    } catch (error) {
      console.error("Error fetching insights", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if the form is valid and all fields are filled
  const isFormValid =
    username &&
    salary &&
    goal &&
    timeline &&
    !errors.salary &&
    !errors.goal &&
    !errors.timeline;

  return (
    <div className="App">
      {/* <header>
        <h1>Expense Tracker</h1>
      </header> */}
      <main>
        {/* <form onSubmit={handleSubmit} className
  ="input-container">
          <input
            type="text"
            placeholder="Enter username
      "
            value={username
      }
            onChange={(e) => {
              setUsername
        (e.target.value);
              validateUsername
        (e.target.value);
            }}
          />

          <input
            type="number"
            min="1"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => {
              setSalary(e.target.value);
              validateSalary(e.target.value);
            }}
          />
          {errors.salary && <span className
    ="error">{errors.salary}</span>}

          <input
            type="text"
            placeholder="Enter financial goal"
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              validateGoal(e.target.value);
            }}
          />
          {errors.goal && <span className
    ="error">{errors.goal}</span>}

          <input
            type="number"
            min="1"
            placeholder="Enter goal timeline in weeks"
            value={timeline}
            onChange={(e) => {
              setTimeline(e.target.value);
              validateTimeline(e.target.value);
            }}
          />
          {errors.timeline && <span className
    ="error">{errors.timeline}</span>}

          <div className
    ="button-container">
            <button type="submit" disabled={loading || !isFormValid}>
              {loading ? "Loading..." : "Get Insights"}
            </button>
          </div>
        </form> */}

        
          {insights && insights.ActionableInsights?.length > 0 ? (
            <Insights insightsData={insights} />
          ) : (
            <p>No insights available.</p>
          )}
      </main>
    </div>
  );
}

export default App;
