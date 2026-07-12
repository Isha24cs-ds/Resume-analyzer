import { useState } from "react";
import "./Pages.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

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

            <button className="primary-btn">
              Analyze Resume
            </button>

          </div>

        </div>
      </div>
    </>
  );
}