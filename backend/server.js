const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
    dest: "uploads/"
});

app.get("/", (req, res) => {
    res.send("Resume Analyzer Backend Running");
});

app.post("/analyze", upload.single("resume"), async (req, res) => {

    console.log("\n===== ANALYZE ROUTE HIT =====");

    try {

        console.log("File received:");
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const dataBuffer = fs.readFileSync(req.file.path);

        console.log("PDF file read successfully");

        const pdfData = await pdfParse(dataBuffer);

        console.log("PDF parsed successfully");

        const resumeText = pdfData.text || "";

        console.log("Extracted text:");
        console.log(resumeText.substring(0, 200));

        let score = 0;

        const skills = [
            "c++",
            "java",
            "python",
            "javascript",
            "react",
            "node",
            "mongodb",
            "sql",
            "html",
            "css"
        ];

        skills.forEach(skill => {
            if (resumeText.toLowerCase().includes(skill)) {
                score += 10;
            }
        });

        if (score > 100) {
            score = 100;
        }

        console.log("Sending score:", score);

        res.json({
            atsScore: score,
            extractedText: resumeText.substring(0, 500)
        });

    } catch (error) {

        console.error("\n===== ERROR OCCURRED =====");
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});