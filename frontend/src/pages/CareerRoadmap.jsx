import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";

export default function CareerRoadmap() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <Sidebar />

          <div className="page-content">
            <h2>No Career Roadmap Found</h2>

            <button
              className="primary-btn"
              onClick={() => navigate("/resume-analyzer")}
            >
              Analyze Resume
            </button>
          </div>
        </div>
      </>
    );
  }

  const roadmap = state.careerRoadmap;

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">

          <h1>🚀 AI Career Roadmap</h1>

          <div className="glass-card">

            <h2>📅 Personalized Learning Plan</h2>

            <h3>Duration</h3>

            <p>{roadmap.duration}</p>

            <h3>Expected ATS After Completion</h3>

            <h2 style={{ color: "#4CAF50" }}>
              {roadmap.expectedATS}%
            </h2>

            <p>{roadmap.summary}</p>

          </div>

          {roadmap.weeks.map((week, index) => (
            <div
              className="glass-card"
              key={index}
              style={{ marginTop: "20px" }}
            >
              <h2>{week.week}</h2>

              <h3>{week.title}</h3>

              <ul>
                {week.topics.map((topic, i) => (
                  <li key={i}>
                    <input
                      type="checkbox"
                      style={{ marginRight: "10px" }}
                    />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div
            className="glass-card"
            style={{ marginTop: "20px" }}
          >
            <h2>🎯 Goal</h2>

            <p>
              Complete this roadmap consistently for the next{" "}
              <strong>30 days</strong> to improve your ATS score,
              technical skills, and interview readiness.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/mock-interview")}
            >
              🎤 Start Mock Interview
            </button>

          </div>

        </div>
      </div>
    </>
  );
}