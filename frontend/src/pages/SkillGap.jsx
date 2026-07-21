import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";

export default function SkillGap() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <Sidebar />

          <div className="page-content">
            <h2>No analysis found.</h2>
            <p>Please analyze your resume first.</p>

            <button
              className="primary-btn"
              onClick={() => navigate("/resume-analyzer")}
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  const skillGap = state.skillGap;

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">

          <h1>📊 Skill Gap Analysis</h1>

          {/* Overall Match */}

          <div className="glass-card">

            <h2>Overall Skill Match</h2>

            <h1>{skillGap.overallMatch}%</h1>

          </div>

          {/* Matched Skills */}

          <div className="glass-card">

            <h2>✅ Matched Skills</h2>

            <ul>
              {(skillGap.matchedSkills || []).map((skill, index) => (
                <li key={index}>✅ {skill}</li>
              ))}
            </ul>

          </div>

          {/* Missing Skills */}

          <div className="glass-card">

            <h2>❌ Missing Skills</h2>

            <ul>
              {(skillGap.missingSkills || []).map((skill, index) => (
                <li key={index}>📌 {skill}</li>
              ))}
            </ul>

          </div>

          {/* Strengths */}

          <div className="glass-card">

            <h2>💪 Strengths</h2>

            <ul>
              {(skillGap.strengths || []).map((item, index) => (
                <li key={index}>⭐ {item}</li>
              ))}
            </ul>

          </div>

          {/* Weaknesses */}

          <div className="glass-card">

            <h2>⚠️ Weaknesses</h2>

            <ul>
              {(skillGap.weaknesses || []).map((item, index) => (
                <li key={index}>❌ {item}</li>
              ))}
            </ul>

          </div>

          {/* High Priority */}

          <div className="glass-card">

            <h2>🔥 High Priority Skills</h2>

            <ul>
              {(skillGap.highPrioritySkills || []).map((item, index) => (
                <li key={index}>🚀 {item}</li>
              ))}
            </ul>

          </div>

          {/* Recommendation */}

          <div className="glass-card">

            <h2>🤖 AI Recommendation</h2>

            <p>{skillGap.recommendation}</p>

          </div>

          {/* Next Button */}

          <button
            className="primary-btn"
            style={{ marginTop: "20px" }}
            onClick={() =>
              navigate("/career-roadmap", {
                state,
              })
            }
          >
            🚀 Generate Career Roadmap
          </button>

        </div>
      </div>
    </>
  );
}