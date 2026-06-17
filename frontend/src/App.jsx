import { useState } from "react";
import "./App.css";
import robot from "./assets/robot.png"; 

function App() {
  const [activeTab, setActiveTab] = useState("analysis");
  const [chatOpen, setChatOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
const [chatResponse, setChatResponse] = useState("");
const [chatLoading, setChatLoading] = useState(false);

  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [jobDescription, setJobDescription] = useState("");
  const [jobMatchScore, setJobMatchScore] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);

  const [interviewQuestions, setInterviewQuestions] = useState([]);



  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append(
      "jobDescription",
      jobDescription
    );

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

      console.log(data);

      setScore(data.atsScore);

      setJobMatchScore(
        data.jobMatchScore
      );

      setStrengths(
        data.strengths || []
      );

      setWeaknesses(
        data.weaknesses || []
      );

      setSuggestions(
        data.suggestions || []
      );

      setMissingSkills(
        data.missingSkills || []
      );

      setInterviewQuestions(
        data.interviewQuestions || []
      );

    } catch (error) {
      console.error(error);
      alert("Error analyzing resume");
    }

    setLoading(false);
  };
const handleChat = async () => {
  if (!chatMessage.trim()) return;

  try {
    setChatLoading(true);

    const response = await fetch(
      "http://localhost:5000/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: chatMessage,
        }),
      }
    );

    const data = await response.json();

    setChatResponse(data.reply);

  } catch (error) {
    console.error(error);
    alert("Chat error");
  }

  setChatLoading(false);
};
  return (
    <div className="container">
      <div className="card">

        <h1>
           AI Resume Analyzer
           </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <textarea
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
        />

        <button onClick={handleAnalyze}>
          Analyze Resume
        </button>

        {loading && (
          <p className="loading">
            Analyzing Resume...
          </p>
        )}

        {score !== null && (
          <>
            <div className="dashboard">

              <div className="score-card">
                <h3>🎯 ATS Score</h3>
                <div className="score">
                  {score}
                </div>
              </div>

              <div className="score-card">
                <h3>💼 Job Match</h3>
                <div className="score">
                  {jobMatchScore}%
                </div>
              </div>

            </div>

            <div className="menu-grid">

              <div
                className="menu-card"
                onClick={() =>
                  setActiveTab(
                    "analysis"
                  )
                }
              >
                📊 Analysis
              </div>

              <div
                className="menu-card"
                onClick={() =>
                  setActiveTab(
                    "career"
                  )
                }
              >
                💼 Career Guidance
              </div>

              <div
                className="menu-card"
                onClick={() =>
                  setActiveTab(
                    "interview"
                  )
                }
              >
                🎤 Interview Prep
              </div>

            </div>

            {activeTab ===
              "analysis" && (
              <>
                <div className="section">
                  <h3>
                    💪 Strengths
                  </h3>

                  <ul>
                    {strengths.map(
                      (
                        item,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          ✅ {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="section">
                  <h3>
                    ⚠️ Weaknesses
                  </h3>

                  <ul>
                    {weaknesses.map(
                      (
                        item,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          ❌ {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </>
            )}

            {activeTab ===
              "career" && (
              <>
                <div className="section">
                  <h3>
                    🚀 Missing
                    Skills
                  </h3>

                  <ul>
                    {missingSkills.map(
                      (
                        item,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          📌 {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="section">
                  <h3>
                    💡 Suggestions
                  </h3>

                  <ul>
                    {suggestions.map(
                      (
                        item,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          👉 {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </>
            )}

            {activeTab ===
              "interview" && (
              <div className="section">
                <h3>
                  🎤 Interview
                  Questions
                </h3>

                <ul>
                  {interviewQuestions.map(
                    (
                      question,
                      index
                    ) => (
                      <li
                        key={
                          index
                        }
                      >
                        {index + 1}.
                        {" "}
                        {
                          question
                        }
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          </>
        )}

      </div>
      <div
  className="chatbot-button"
  onClick={() => setChatOpen(!chatOpen)}
>
  <img
    src={robot}
    alt="AI Assistant"
    className="robot-icon"
  />

  <div className="robot-text">
    May I Help You?
  </div>
</div>
<div
  className="chatbot-button"
  onClick={() => setChatOpen(!chatOpen)}
>
  <img
    src={robot}
    alt="AI Assistant"
    className="robot-icon"
  />

  <div className="robot-text">
    May I Help You?
  </div>
</div>

{chatOpen && (
  <div className="chat-window">

    <div className="chat-header">
      🤖 AI Career Assistant
    </div>

    <div className="chat-body">

      {chatResponse && (
        <div className="chat-message">
          {chatResponse}
        </div>
      )}

      {chatLoading && (
        <div className="chat-message">
          Thinking...
        </div>
      )}

    </div>

    <div className="chat-input">

      <input
        type="text"
        placeholder="Ask me anything..."
        value={chatMessage}
        onChange={(e) =>
          setChatMessage(e.target.value)
        }
      />

      <button
        type="button"
        onClick={handleChat}
      >
        Send
      </button>

    </div>

  </div>
)}
    </div>
  );
}



export default App;