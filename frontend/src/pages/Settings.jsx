import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Settings() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <h1>⚙️ Settings</h1>

          <p>
            Manage your account, preferences, notifications and AI settings.
          </p>

          <div className="glass-card">
            <h2>Coming Soon</h2>

            <p>
              Profile settings, theme customization and account preferences
              will be available here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}