import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DashboardCard({
  title,
  icon,
  path,
  description,
}) {

  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.3,
      }}
      className="dashboard-card"
      onClick={() => navigate(path)}
    >
      <div className="card-glow"></div>

      <div className="card-top">

        <div className="card-icon">
          {icon}
        </div>

        <FaArrowRight className="arrow" />

      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <div className="ai-ready">

        <span className="dot"></span>

        AI Ready

      </div>

    </motion.div>
  );
}