import { useState } from "react";
import "./Pages.css";

function Jobs() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchJobs = async () => {
    if (!role || !location) {
      alert("Please enter both role and location.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setJobs([]);

      const response = await fetch("https://resume-analyzer-w806.onrender.com/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="glass-card">

        <h1>💼 AI Job Finder</h1>

        <p>
          Search jobs based on your preferred role and location.
        </p>

        <input
          type="text"
          placeholder="Job Role (e.g. Software Engineer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location (e.g. Bangalore)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={searchJobs}>
          Search Jobs
        </button>

        {loading && (
          <p style={{ marginTop: "20px" }}>
            🔍 Searching jobs...
          </p>
        )}

        {error && (
          <p style={{ color: "red", marginTop: "20px" }}>
            {error}
          </p>
        )}

        {!loading && jobs.length > 0 && (
          <div style={{ marginTop: "30px" }}>

            <h2>Jobs Found ({jobs.length})</h2>

            {jobs.map((job, index) => (
              <div
                key={index}
                className="glass-card"
                style={{
                  marginTop: "20px",
                  textAlign: "left",
                }}
              >
                <h3>{job.title}</h3>

                <p>
                  <strong>Company:</strong> {job.company}
                </p>

                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>

                <p>
                  <strong>Employment:</strong> {job.type}
                </p>

                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>
                    Apply Now
                  </button>
                </a>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Jobs;