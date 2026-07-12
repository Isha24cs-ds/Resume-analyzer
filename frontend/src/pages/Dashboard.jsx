import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import StatsCard from "../components/StatsCard";

import {
  FaFileAlt,
  FaBriefcase,
  FaMicrophone,
  FaLinkedin,
  FaFileSignature,
  FaRoad,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">

          <div className="dashboard-header">
            <h1>Welcome Back 👋</h1>

            <p>Your AI Career Workspace</p>
          </div>

          <div className="stats-grid">

            <StatsCard
              value="98%"
              title="ATS Accuracy"
            />

            <StatsCard
              value="5000+"
              title="Resume Reviews"
            />

            <StatsCard
              value="12000+"
              title="Interview Questions"
            />

            <StatsCard
              value="2000+"
              title="Jobs Available"
            />

          </div>

          <div className="cards-grid">

            <DashboardCard
              title="Resume Analyzer"
              description="Analyze ATS score, strengths and weaknesses."
              icon={<FaFileAlt />}
              path="/resume"
            />

            <DashboardCard
              title="Live Jobs"
              description="Find internships and jobs matched to your resume."
              icon={<FaBriefcase />}
              path="/jobs"
            />

            <DashboardCard
              title="Mock Interview"
              description="Practice interviews with AI."
              icon={<FaMicrophone />}
              path="/mock-interview"
            />

            <DashboardCard
              title="Resume Builder"
              description="Create ATS friendly resumes."
              icon={<FaFileSignature />}
              path="/resume-builder"
            />

            <DashboardCard
              title="LinkedIn Optimizer"
              description="Improve your LinkedIn profile."
              icon={<FaLinkedin />}
              path="/linkedin"
            />

            <DashboardCard
              title="Career Roadmap"
              description="Generate roadmap for your dream company."
              icon={<FaRoad />}
              path="/roadmap"
            />

            <DashboardCard
              title="Skill Gap Analysis"
              description="Identify missing skills."
              icon={<FaChartLine />}
              path="/skill-gap"
            />

            <DashboardCard
              title="AI Career Chat"
              description="Chat with AI career assistant."
              icon={<FaRobot />}
              path="/chat"
            />

          </div>

        </div>

      </div>
    </>
  );
}