import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [skills, setSkills] = useState([]);
  const [courses, setCourses] = useState([]);

  const [newSkill, setNewSkill] = useState("");
  const [newCourse, setNewCourse] = useState("");

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    if (!user) {
      return;
    }

    setName(user.name || "");
    setEmail(user.email || "");

    // Load locally saved profile information
    const savedName = localStorage.getItem("pathwiseProfileName");

    const savedSkills = localStorage.getItem("pathwiseProfileSkills");

    const savedCourses = localStorage.getItem("pathwiseProfileCourses");

    if (savedName) {
      setName(savedName);
    }

    if (savedSkills) {
      try {
        const parsedSkills = JSON.parse(savedSkills);

        if (Array.isArray(parsedSkills)) {
          setSkills(parsedSkills);
        }
      } catch (err) {
        console.error("Failed to load saved skills:", err);
      }
    }

    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);

        if (Array.isArray(parsedCourses)) {
          setCourses(parsedCourses);
        }
      } catch (err) {
        console.error("Failed to load saved courses:", err);
      }
    }
  }, [user]);

  // =====================================================
  // ADD SKILL
  // =====================================================

  const handleAddSkill = () => {
    const skill = newSkill.trim();

    if (!skill) {
      return;
    }

    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase(),
    );

    if (alreadyExists) {
      setNewSkill("");
      return;
    }

    setSkills((prev) => [...prev, skill]);

    setNewSkill("");
    setMessage("");
    setError("");
  };

  // =====================================================
  // REMOVE SKILL
  // =====================================================

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));

    setMessage("");
    setError("");
  };

  // =====================================================
  // ADD COURSE
  // =====================================================

  const handleAddCourse = () => {
    const course = newCourse.trim();

    if (!course) {
      return;
    }

    const alreadyExists = courses.some(
      (item) => item.toLowerCase() === course.toLowerCase(),
    );

    if (alreadyExists) {
      setNewCourse("");
      return;
    }

    setCourses((prev) => [...prev, course]);

    setNewCourse("");
    setMessage("");
    setError("");
  };

  // =====================================================
  // REMOVE COURSE
  // =====================================================

  const handleRemoveCourse = (courseToRemove) => {
    setCourses((prev) => prev.filter((course) => course !== courseToRemove));

    setMessage("");
    setError("");
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleSkillKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddSkill();
    }
  };

  const handleCourseKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddCourse();
    }
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSaveProfile = async () => {
    setMessage("");
    setError("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    try {
      setSaving(true);

      // =================================================
      // SAVE NAME LOCALLY
      // =================================================

      localStorage.setItem("pathwiseProfileName", trimmedName);

      // =================================================
      // SAVE SKILLS LOCALLY
      // =================================================

      localStorage.setItem("pathwiseProfileSkills", JSON.stringify(skills));

      // =================================================
      // SAVE COURSES LOCALLY
      // =================================================

      localStorage.setItem("pathwiseProfileCourses", JSON.stringify(courses));

      // =================================================
      // UPDATE SAVED USER
      // =================================================

      const savedUser = JSON.parse(localStorage.getItem("pathwiseUser")) || {};

      const updatedUser = {
        ...savedUser,
        ...user,
        name: trimmedName,
        email: email || user.email,
        skills,
        courses,
      };

      localStorage.setItem("pathwiseUser", JSON.stringify(updatedUser));

      // =================================================
      // NOTIFY OTHER PAGES
      // =================================================

      window.dispatchEvent(
        new CustomEvent("pathwiseProfileUpdated", {
          detail: {
            name: trimmedName,
            skills,
            courses,
          },
        }),
      );

      // =================================================
      // SUCCESS
      // =================================================

      setMessage("Profile updated successfully!");

      // =================================================
      // GO TO DASHBOARD
      // =================================================

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);

      setError("Unable to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    navigate("/dashboard");
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <p className="text-slate-600">Please log in to view your profile.</p>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // AVATAR
  // =====================================================

  const avatarLetter = name.trim().charAt(0).toUpperCase() || "U";

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

            <p className="text-slate-500 mt-1">
              Manage your PathWise AI profile.
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition disabled:opacity-50"
          >
            Logout
          </button>
        </div>

        {/* PROFILE CARD */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* PROFILE HEADER */}

          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-sm">
              {avatarLetter}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {name || "Your Name"}
              </h2>

              <p className="text-slate-500">PathWise AI Student</p>
            </div>
          </div>

          {/* FULL NAME */}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setMessage("");
                setError("");
              }}
              placeholder="Enter your name"
              disabled={saving}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* EMAIL */}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500"
            />

            <p className="text-xs text-slate-400 mt-2">
              Email cannot be changed from your profile.
            </p>
          </div>

          {/* SKILLS */}

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Skills
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                value={newSkill}
                onChange={(event) => setNewSkill(event.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="e.g. Java, React, MongoDB"
                disabled={saving}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={handleAddSkill}
                disabled={saving}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                Add
              </button>
            </div>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg"
                  >
                    <span className="font-medium">{skill}</span>

                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      disabled={saving}
                      className="text-indigo-500 hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COURSES / CERTIFICATIONS */}

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Courses / Certifications
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                value={newCourse}
                onChange={(event) => setNewCourse(event.target.value)}
                onKeyDown={handleCourseKeyDown}
                placeholder="e.g. React, Java DSA, AWS"
                disabled={saving}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={handleAddCourse}
                disabled={saving}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                Add
              </button>
            </div>

            {courses.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {courses.map((course) => (
                  <div
                    key={course}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg"
                  >
                    <span className="font-medium">{course}</span>

                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course)}
                      disabled={saving}
                      className="text-purple-500 hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-slate-400 mt-2">
              Saved locally for now. We'll connect this to MongoDB later.
            </p>
          </div>

          {/* SUCCESS */}

          {message && (
            <div className="mb-5 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium">
              {message}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium">
              {error}
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
