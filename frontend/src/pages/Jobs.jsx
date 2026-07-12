import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const response = await fetch("http://localhost:5000/test-jobs");

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <h1>💼 Live Jobs & Internships</h1>

          <p>
            Discover jobs and internships recommended for your profile.
          </p>

          {loading ? (
            <h2>Loading jobs...</h2>
          ) : jobs.length === 0 ? (
            <h2>No Jobs Found</h2>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job, index) => (
                <div className="job-card" key={index}>
                  <h2>{job.title}</h2>

                  <h3>{job.company}</h3>

                  <p>📍 {job.location}</p>

                  <p>💰 {job.salary}</p>

                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="primary-btn">
                      Apply Now
                    </button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}