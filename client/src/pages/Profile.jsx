// src/pages/Profile.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedName =
      localStorage.getItem("pathwiseProfileName") ||
      user?.displayName ||
      user?.email?.split("@")[0] ||
      "";

    const savedSkills = localStorage.getItem("pathwiseProfileSkills");

    setName(savedName);
    setEmail(user?.email || "");

    if (savedSkills) {
      try {
        const parsed = JSON.parse(savedSkills);

        if (Array.isArray(parsed)) {
          setSkills(parsed);
        }
      } catch {
        setSkills([]);
      }
    }
  }, [user]);

  const addSkill = () => {
    const newSkill = skillInput.trim();

    if (!newSkill) return;

    const exists = skills.some(
      (skill) => skill.toLowerCase() === newSkill.toLowerCase(),
    );

    if (exists) {
      setSkillInput("");
      return;
    }

    const updatedSkills = [...skills, newSkill];

    setSkills(updatedSkills);
    setSkillInput("");

    localStorage.setItem(
      "pathwiseProfileSkills",
      JSON.stringify(updatedSkills),
    );
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);

    setSkills(updatedSkills);

    localStorage.setItem(
      "pathwiseProfileSkills",
      JSON.stringify(updatedSkills),
    );
  };

  const saveProfile = () => {
    localStorage.setItem("pathwiseProfileName", name.trim());

    localStorage.setItem("pathwiseProfileSkills", JSON.stringify(skills));

    setMessage("Profile saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 font-bold text-white">
              P
            </div>

            <span className="text-xl font-bold text-slate-900 dark:text-white">
              PathWise
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20"
          >
            ← Dashboard
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            Account
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            My Profile
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Manage your profile information and skills.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {/* AVATAR */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-3xl font-bold text-white">
              {(name || user?.email || "U").charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {name || "Your Profile"}
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {email || "No email available"}
              </p>
            </div>
          </div>

          {/* NAME */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            />

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Your email is managed by your authentication account.
            </p>
          </div>

          {/* SKILLS */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Skills
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <button
                type="button"
                onClick={addSkill}
                className="rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
              >
                Add
              </button>
            </div>

            {skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 rounded-full bg-primary-50 px-3 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  >
                    <span>{skill}</span>

                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="font-bold text-primary-500 hover:text-red-600"
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                No skills added yet.
              </p>
            )}
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mb-5 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
              {message}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={saveProfile}
              className="flex-1 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700"
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="mt-6 rounded-2xl border border-red-200 bg-white p-6 dark:border-red-900/50 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white">Account</h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sign out of your PathWise account.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
