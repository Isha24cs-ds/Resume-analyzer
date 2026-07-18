import { useState } from "react";
import "./Pages.css";

function MockInterview() {
  const API_URL = "http://localhost:5000";

  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/interview/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          difficulty,
        }),
      });

      const data = await response.json();

      console.log(data);

      setQuestions(data);
      setCurrentQuestion(0);
    } catch (error) {
      console.error(error);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishInterview = () => {
    alert("🎉 Interview Completed!");
  };

  return (
    <div className="page-container">
      <div className="glass-card">

        <h1>🎤 AI Mock Interview</h1>

        <p>Practice interviews powered by Gemini AI.</p>

        <br />

        <label><strong>Role</strong></label>

        <br />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        >
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
          <option>Java Developer</option>
          <option>Python Developer</option>
          <option>Data Analyst</option>
          <option>Data Scientist</option>
        </select>

        <br />
        <br />

        <label><strong>Difficulty</strong></label>

        <br />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <br />
        <br />

        <button
          onClick={startInterview}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating Questions..." : "Start Interview"}
        </button>

        {!loading && questions.length > 0 && (
          <>
            <hr style={{ margin: "30px 0" }} />

            <h2>
              Question {currentQuestion + 1} / {questions.length}
            </h2>

            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "12px",
                background: "#1f2937",
                color: "white",
              }}
            >
              <h3>{questions[currentQuestion].question}</h3>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                ⬅ Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button onClick={finishInterview}>
                  ✅ Finish Interview
                </button>
              ) : (
                <button onClick={nextQuestion}>
                  Next ➜
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MockInterview;