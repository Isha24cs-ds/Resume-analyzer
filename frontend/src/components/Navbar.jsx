import { motion } from "framer-motion";
import {
  FaBell,
  FaUserCircle,
  FaRobot,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="logo">
        <FaRobot className="logo-icon" />
        <div>
          <h2>Career Ascent AI</h2>
          <span>Your AI Career Copilot</span>
        </div>
      </div>

      <div className="nav-links">
        <a href="#">Dashboard</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">About</a>
      </div>

      <div className="nav-right">
        <FaBell className="nav-icon" />

        <FaUserCircle className="profile-icon" />
      </div>
    </motion.nav>
  );
}