import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BASE_URL, CREATE_USER, GET_INSIGHTS } from "./constant/endpoint";
import Insights from "./pages/Insights";
//import { insights as dummyInsights} from "./constant/insights";

function App() {

  const [username, setUsername
  ] = useState("");
  const [salary, setSalary] = useState("");
  const [goal, setGoal] = useState("");
  const [timeline, setTimeline] = useState("");
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Crunching numbers...");
  const [errors, setErrors] = useState({
    username: "",
    salary: "",
    goal: "",
    timeline: "",
  });

  const loadingMessages = [
    "Crunching numbers...",
    "Analyzing your spending habits...",
    "Finding ways to save more money...",
    "Optimizing your budget...",
    "Scolding your bank account...",
    "Consulting the finance wizards...",
    "Turning coins into gold...",
  ];

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
        timeline: "Please enter a valid timeline in months.",
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
    setInsights(null); 

    try {
      const createUserResponse = await axios.post(`${BASE_URL}/${CREATE_USER}`, {
        username,
        salary,
        goal,
        timeline,
      });

      if(createUserResponse.status === 200) {
        const response = await axios.get(`${BASE_URL}/${GET_INSIGHTS}/${username}`, {
          timeout: 120000,
        });
        setInsights(response.data);
      }else {
        console.error("User creation failed:", createUserResponse.data);
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.error("Request timed out. Please try again later.");
      } else {
        console.error("Error fetching insights", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if(loading){
      interval = setInterval(() => {
        const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        setLoadingMessage(randomMessage);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [loading]);

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
        {!loading && !insights && (
          <header>
            <h1>Expense Tracker</h1>
          </header>
        )}

        <main>
          {loading ? (
            <div className="loading-screen">
              <div className="spinner"></div>
              <p className="loading-text">{loadingMessage}</p>
            </div>
          ) : insights && insights.insights?.length > 0 ? (
            <Insights insightsData={insights} />
          ) : (
            <form onSubmit={handleSubmit} className="input-container">
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateUsername(e.target.value);
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
              {errors.salary && <span className="error">{errors.salary}</span>}

              <input
                type="text"
                placeholder="Enter financial goal"
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                  validateGoal(e.target.value);
                }}
              />
              {errors.goal && <span className="error">{errors.goal}</span>}

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
              {errors.timeline && (
                <span className="error">{errors.timeline}</span>
              )}

              <div className="button-container">
                <button type="submit" disabled={loading || !isFormValid}>
                  Get Insights
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    );
  }
export default App;
