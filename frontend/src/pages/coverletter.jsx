import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";

export default function CoverLetter() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <h1>📄 AI Cover Letter Generator</h1>

          <p>
            Generate personalized cover letters for every job application.
          </p>

          <div className="glass-card">
            <h2>Coming Soon...</h2>

            <p>
              This page will be connected to Gemini AI in the next step.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}