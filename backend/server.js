require("dotenv").config();

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

    console.log("PDF parsed successfully");

    const prompt = `
Analyze the following resume.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Rules:
- ATS score must be between 0 and 100.
- Give 3-5 strengths.
- Give 3-5 weaknesses.
- Give 3-5 suggestions.
- Return only JSON.
- Do not return markdown.

Resume:
${resumeText}
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

    const aiResult = JSON.parse(cleaned);

    res.json(aiResult);

  } catch (error) {
    console.error("\n===== ERROR OCCURRED =====");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});