import { useState } from "react";
import "./Pages.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Jobs() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("India");
  const [jobType, setJobType] = useState("Internship");
  const [workMode, setWorkMode] = useState("Remote");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchJobs = async () => {
    if (!role) {
      alert("Please enter a job role.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://resume-analyzer-w806.onrender.com/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role,
            location,
            jobType,
            workMode,
          }),
        }
      );
      console.log("Status:", response.status);
      const data = await response.json();

      console.log(data);

    } catch (err) {
  console.error("Job Fetch Error:", err);

  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Unable to fetch jobs");
  }
}

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">

          <h1>💼 Job Finder</h1>

          <div className="glass-card">

            <label>Job Role</label>

            <input
              type="text"
              placeholder="Full Stack Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <label>Location</label>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>India</option>
              <option>Bangalore</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Hyderabad</option>
              <option>Pune</option>
            </select>

            <label>Job Type</label>

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option>Internship</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
            </select>

            <label>Work Mode</label>

            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            >
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>

            <button
              className="primary-btn"
              onClick={searchJobs}
            >
              {loading ? "Searching..." : "Search Jobs"}
            </button>

          </div>

          <br />

          {jobs.map((job, index) => (

            <div
              key={index}
              className="glass-card"
              style={{ marginBottom: "20px" }}
            >

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

      </div>

    </>
  );
}