import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Jobs from "./pages/Jobs";
import MockInterview from "./pages/MockInterview";
import LinkedInOptimizer from "./pages/LinkedInOptimizer";
import CareerRoadmap from "./pages/CareerRoadmap";
import SkillGap from "./pages/SkillGap";
import CoverLetter from "./pages/CoverLetter";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/" element={<Landing />} />
<Route path="/skill-gap" element={<SkillGap />}/>
    <Route path="/career-roadmap" element={<CareerRoadmap />}/>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/resume" element={<ResumeAnalyzer />} />

  

        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

        <Route
          path="/linkedin"
          element={<LinkedInOptimizer />}
        />

        <Route
          path="/roadmap"
          element={<CareerRoadmap />}
        />

        <Route
          path="/skill-gap"
          element={<SkillGap />}
        />

        <Route
          path="/cover-letter"
          element={<CoverLetter />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;