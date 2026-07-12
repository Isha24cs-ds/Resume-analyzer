import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function SkillGap() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <h1>📈 Skill Gap Analysis</h1>

          <p>
            Compare your resume with a job description and discover missing
            skills.
          </p>

          <div className="glass-card">
            <h2>Coming Soon</h2>

            <p>
              This module will analyze your resume and provide a personalized
              learning roadmap using AI.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}