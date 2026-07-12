import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function LinkedInOptimizer() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <h1>LinkedIn Optimizer</h1>
          <p>This page will optimize LinkedIn profiles using AI.</p>
        </div>
      </div>
    </>
  );
}