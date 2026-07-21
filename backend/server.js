require("dotenv").config();
const axios = require("axios");
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const upload = multer({
  dest: "uploads/",
});

app.get("/", (req, res) => {
  res.send("AI Resume Analyzer Backend Running");
});

app.post("/analyze", upload.single("resume"), async (req, res) => {
  console.log("\n===== ANALYZE ROUTE HIT =====");

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    console.log("File received:", req.file.originalname);

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text || "";

    const jobDescription =
      req.body.jobDescription || "";

    console.log("PDF parsed successfully");

    const prompt = `
You are an expert ATS Resume Reviewer, Career Coach, and Technical Interview Mentor.

Analyze the resume against the provided job description.

Return ONLY valid JSON.

{
  "resumeAnalysis": {
    "atsScore": 0,
    "jobMatchScore": 0,
    "recommendedRole": "",
    "summary": "",
    "suggestions": []
  },

  "skillGap": {
    "overallMatch": 0,

    "matchedSkills": [],

    "missingSkills": [],

    "strengths": [],

    "weaknesses": [],

    "highPrioritySkills": [],

    "recommendation": ""
  },

  "careerRoadmap": {
    "duration": "30 Days",

    "weeks": [
      {
        "week": "Week 1",
        "title": "",
        "topics": []
      },
      {
        "week": "Week 2",
        "title": "",
        "topics": []
      },
      {
        "week": "Week 3",
        "title": "",
        "topics": []
      },
      {
        "week": "Week 4",
        "title": "",
        "topics": []
      }
    ],

    "expectedATS": 0,

    "summary": ""
  },

  "interviewQuestions": []
}

Rules:

1. ATS Score must be between 0-100.

2. Job Match Score must be between 0-100.

3. Recommend the best suited software role.

4. Write a professional resume summary.

5. Give exactly 5 resume improvement suggestions.

6. Extract all skills from the resume.

7. Separate them into:

- matchedSkills
- missingSkills

8. Give exactly 5 strengths.

9. Give exactly 5 weaknesses.

10. Select the most important missing skills as highPrioritySkills.

11. Create a personalized 30-day learning roadmap.

Week 1 should start with beginner topics.

Week 4 should finish with deployment/interview preparation.

12. Estimate ATS score after completing the roadmap.

13. Generate exactly 10 interview questions.

Return ONLY JSON.

Resume:

${resumeText}

Job Description:

${jobDescription}
`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text;

    console.log("\n===== GEMINI RESPONSE =====");
    console.log(responseText);

    const cleaned = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let aiResult;

try {
  aiResult = JSON.parse(cleaned);
} catch (err) {
  console.error("Invalid JSON from Gemini:");
  console.log(cleaned);

  return res.status(500).json({
    message: "Gemini returned invalid JSON.",
  });
}

   aiResult.resumeAnalysis = aiResult.resumeAnalysis || {
  atsScore: 0,
  jobMatchScore: 0,
  recommendedRole: "",
  summary: "",
  suggestions: [],
};

aiResult.skillGap = aiResult.skillGap || {
  overallMatch: 0,
  matchedSkills: [],
  missingSkills: [],
  strengths: [],
  weaknesses: [],
  highPrioritySkills: [],
  recommendation: "",
};

aiResult.careerRoadmap = aiResult.careerRoadmap || {
  duration: "30 Days",
  weeks: [],
  expectedATS: 0,
  summary: "",
};

aiResult.interviewQuestions =
  aiResult.interviewQuestions || [];
    res.json(aiResult);

  } catch (error) {
    console.error("\n===== ERROR OCCURRED =====");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
app.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are an AI Career Assistant.

Help users with:
- Resume improvement
- ATS score
- Internships
- Placements
- Interview preparation
- Career guidance

Question:
${message}
`,
      });

    res.json({
      reply: response.text,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "Something went wrong",
    });
  }
});
app.post("/jobs", async (req, res) => {
  try {
    const { role, location } = req.body;

    console.log("===== JOB SEARCH =====");
    console.log("Role:", role);
    console.log("Location:", location);

    const response = await axios.post(
      `https://jooble.org/api/${process.env.JOOBLE_API_KEY}`,
      {
        keywords: role,
        location: location,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Jooble Response Received");

    const jobs = (response.data.jobs || []).map((job) => ({
      title: job.title || "N/A",
      company: job.company || "Unknown Company",
      location: job.location || "Not Specified",
      salary: job.salary || "Not Specified",
      type: job.type || "Not Specified",
      applyLink: job.link,
    }));
    console.log("Full Jooble Response:");
console.log(JSON.stringify(response.data, null, 2));

    res.json(jobs);

  } catch (err) {
    console.error("===== JOOBLE ERROR =====");
    console.error(err.response?.data || err.message);

    res.status(500).json({
      message: "Unable to fetch jobs",
    });
  }
});
// =======================
// START MOCK INTERVIEW
// =======================

app.post("/interview/start", async (req, res) => {
  try {

    const { role, difficulty } = req.body;

    const prompt = `
You are a professional technical interviewer.

Generate exactly 10 interview questions.

Role:
${role}

Difficulty:
${difficulty}

Rules:
- Return ONLY JSON.
- Do not return markdown.
- Do not explain anything.

Format:

[
  {
    "id":1,
    "question":"Tell me about yourself."
  }
]
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleaned);

    res.json(questions);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Unable to generate interview",
    });

  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});