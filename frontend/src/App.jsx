import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Response:", data);

      setScore(data.atsScore);
      setStrengths(data.strengths || []);
      setWeaknesses(data.weaknesses || []);
      setSuggestions(data.suggestions || []);

    } catch (error) {
      console.error(error);
      alert("Error analyzing resume");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">

        <h1>📄 Resume Analyzer</h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleAnalyze}>
          Analyze Resume
        </button>

        {loading && (
          <p className="loading">Analyzing Resume...</p>
        )}

        {score !== null && (
          <div className="result">
            <h2>ATS Score</h2>
            <div className="score">{score}</div>
          </div>
        )}

        {strengths.length > 0 && (
          <div className="section">
            <h3>💪 Strengths</h3>
            <ul>
              {strengths.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>
          </div>
        )}

        {weaknesses.length > 0 && (
          <div className="section">
            <h3>⚠️ Weaknesses</h3>
            <ul>
              {weaknesses.map((item, index) => (
                <li key={index}>❌ {item}</li>
              ))}
            </ul>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="section">
            <h3>💡 Suggestions</h3>
            <ul>
              {suggestions.map((item, index) => (
                <li key={index}>👉 {item}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;