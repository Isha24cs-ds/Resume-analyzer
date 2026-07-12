import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaBriefcase,
  FaMicrophone,
  FaFileSignature,
  FaLinkedin,
  FaRoad,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    title: "Resume Analyzer",
    icon: <FaFileAlt />,
    path: "/resume",
  },
  {
    title: "Live Jobs",
    icon: <FaBriefcase />,
    path: "/jobs",
  },
  {
    title: "Mock Interview",
    icon: <FaMicrophone />,
    path: "/mock-interview",
  },
  {
    title: "Resume Builder",
    icon: <FaFileSignature />,
    path: "/resume-builder",
  },
  {
    title: "LinkedIn Optimizer",
    icon: <FaLinkedin />,
    path: "/linkedin",
  },
  {
    title: "Career Roadmap",
    icon: <FaRoad />,
    path: "/roadmap",
  },
  {
    title: "Skill Gap",
    icon: <FaChartLine />,
    path: "/skill-gap",
  },
  {
    title: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Workspace</h2>

      {menuItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <span className="sidebar-icon">
            {item.icon}
          </span>

          <span>{item.title}</span>
        </NavLink>
      ))}

      <div className="upgrade-card">
        <h3>Career Pro</h3>

        <p>
          Unlock unlimited AI scans,
          interview practice and premium
          career tools.
        </p>

        <button>
          Upgrade
        </button>
      </div>
    </aside>
  );
}