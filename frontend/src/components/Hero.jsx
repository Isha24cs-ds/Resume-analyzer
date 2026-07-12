import { motion } from "framer-motion";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import robot from "../assets/robot.png";

export default function Hero() {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const section = document.getElementById("features");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero">
      {/* LEFT SIDE */}

      <motion.div
        className="hero-left"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="tag">
          <span className="rocket">🚀</span>
          <span>AI Powered Career Platform</span>
        </div>

        <h1>
          Build Your <span>Dream Career</span>
          <br />
          with Artificial Intelligence
        </h1>

        <p>
          Analyze resumes, improve ATS scores, discover internships,
          prepare for interviews, optimize your LinkedIn profile and
          land your dream job — all from one AI-powered platform.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/resume")}
          >
            Get Started
            <FaArrowRight />
          </button>

          <button
            className="secondary-btn"
            onClick={scrollToFeatures}
          >
            <FaPlayCircle />
            Explore Features
          </button>
        </div>
      </motion.div>

      {/* RIGHT SIDE */}

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-circle">
          <img
            src={robot}
            alt="AI Robot"
            className="robot-image"
          />
        </div>
      </motion.div>
    </section>
  );
}