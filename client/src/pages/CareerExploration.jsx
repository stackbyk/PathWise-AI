import { useNavigate } from "react-router-dom";

const careers = [
  {
    title: "Full Stack Developer",
    description:
      "Build complete web applications using frontend and backend technologies.",
    icon: "💻",
  },
  {
    title: "Cybersecurity Engineer",
    description:
      "Protect systems, networks and applications from cyber threats.",
    icon: "🔐",
  },
  {
    title: "AI / ML Engineer",
    description:
      "Build intelligent systems using machine learning and artificial intelligence.",
    icon: "🤖",
  },
  {
    title: "Data Scientist",
    description: "Analyze data and build models to solve real-world problems.",
    icon: "📊",
  },
  {
    title: "Backend Developer",
    description: "Build APIs, databases and server-side applications.",
    icon: "⚙️",
  },
  {
    title: "Cloud Engineer",
    description:
      "Design, deploy and manage applications using cloud infrastructure.",
    icon: "☁️",
  },
];

function CareerExploration() {
  const navigate = useNavigate();

  // =========================================================
  // SELECT CAREER
  // =========================================================

  const handleCareerSelection = (career) => {
    // Save selected career
    localStorage.setItem("selectedCareer", career);

    // Keep this for compatibility with the assessment flow
    localStorage.setItem("assessmentCareer", career);

    // Save timestamp so we know when the career was selected
    localStorage.setItem("selectedCareerUpdatedAt", new Date().toISOString());

    // Go to skill assessment
    navigate("/skill-assessment");
  };

  // =========================================================
  // OPEN ROADMAP DIRECTLY
  // =========================================================

  const handleRoadmap = (career) => {
    // Save selected career
    localStorage.setItem("selectedCareer", career);

    // Keep assessment career synchronized
    localStorage.setItem("assessmentCareer", career);

    // Save timestamp
    localStorage.setItem("selectedCareerUpdatedAt", new Date().toISOString());

    // Go directly to roadmap
    navigate("/roadmap");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* BACK */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 text-sm font-semibold text-slate-600 hover:text-primary-600"
        >
          ← Back to Dashboard
        </button>

        {/* HEADER */}

        <div className="mb-10">
          <p className="text-sm font-semibold text-primary-600">PATHWISE AI</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Career Explorer
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Choose a career you are interested in and take a personalized skill
            assessment to understand your current skill level.
          </p>
        </div>

        {/* CAREERS */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <div
              key={career.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* ICON */}

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-3xl">
                {career.icon}
              </div>

              {/* TITLE */}

              <h2 className="text-xl font-bold text-slate-900">
                {career.title}
              </h2>

              {/* DESCRIPTION */}

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                {career.description}
              </p>

              {/* ASSESSMENT BUTTON */}

              <button
                onClick={() => handleCareerSelection(career.title)}
                className="mt-6 w-full rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
              >
                Take Skill Assessment →
              </button>

              {/* ROADMAP BUTTON */}

              <button
                onClick={() => handleRoadmap(career.title)}
                className="mt-3 w-full rounded-xl border border-primary-200 bg-white px-5 py-3 font-semibold text-primary-600 transition hover:bg-primary-50"
              >
                View Roadmap
              </button>
            </div>
          ))}
        </div>

        {/* INFO */}

        <div className="mt-10 rounded-2xl border border-primary-100 bg-primary-50 p-6">
          <h2 className="font-bold text-slate-900">How it works</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-primary-600">
                1. Choose a career
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Select the career you want to explore.
              </p>
            </div>

            <div>
              <p className="font-semibold text-primary-600">
                2. Take assessment
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Answer questions about your current skills.
              </p>
            </div>

            <div>
              <p className="font-semibold text-primary-600">
                3. Get your roadmap
              </p>

              <p className="mt-1 text-sm text-slate-600">
                See your skill gaps and recommended learning path.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerExploration;
