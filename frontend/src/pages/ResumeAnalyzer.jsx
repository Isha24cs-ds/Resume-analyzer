import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ResumeAnalyzer() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(
  "http://localhost:5000/analyze",
  {
    method: "POST",
    body: formData,
  }
);
      if (!response.ok) {
        throw new Error("Failed to analyze resume.");
      }

      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
console.log("Skill Gap:", data.skillGap);

      console.log("Analysis Result:", data);

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <h1>📄 AI Resume Analyzer</h1>

          <p>
            Upload your resume and compare it with a job description using AI.
          </p>

          <div className="glass-card">
            <label>Upload Resume (PDF)</label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
            />

            <label>Job Description</label>

            <textarea
              rows="8"
              placeholder="Paste the complete job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              className="primary-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          {result && (
            <div className="glass-card" style={{ marginTop: "25px" }}>
              <h2>📊 Resume Analysis Report</h2>

              <hr />

              <h3>
                🎯 ATS Score:{" "}
                {result.resumeAnalysis?.atsScore ?? 0}
                %
              </h3>

              <h3>
                💼 Job Match Score:{" "}
                {result.resumeAnalysis?.jobMatchScore ?? 0}
                %
              </h3>

              <h3>👨‍💻 Recommended Role</h3>

              <p>
                {result.resumeAnalysis?.recommendedRole ||
                  "Not Available"}
              </p>

              <h3>📝 AI Resume Summary</h3>

              <p>
                {result.resumeAnalysis?.summary ||
                  "No summary available."}
              </p>

              <h3>💡 Resume Improvement Suggestions</h3>

              <ul>
                {(result.resumeAnalysis?.suggestions || []).map(
                  (item, index) => (
                    <li key={index}>✅ {item}</li>
                  )
                )}
              </ul>

              <button
                className="primary-btn"
                style={{ marginTop: "20px" }}
                onClick={() =>
                  navigate("/skill-gap", {
                    state: result,
                  })
                }
              >
                View Skill Gap Analysis →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}