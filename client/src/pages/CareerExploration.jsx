import { useNavigate } from "react-router-dom";

/* =========================================================
   CAREERS
========================================================= */

/*
  IMPORTANT:
  Keep career names consistent with SkillAssessment.jsx.

  AI/ML Engineer is intentionally written as:
  "AI/ML Engineer"

  NOT:
  "AI / ML Engineer"

  This prevents career normalization problems.
*/

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
    title: "AI/ML Engineer",
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

/* =========================================================
   COMPONENT
========================================================= */

function CareerExploration() {
  const navigate = useNavigate();

  /* =======================================================
     SELECT CAREER FOR ASSESSMENT
  ======================================================= */

  const handleCareerSelection = (career) => {
    /*
      Store the selected career.

      SkillAssessment.jsx will use this value to determine
      which career-specific questions should be displayed.
    */

    localStorage.setItem("selectedCareer", career);

    localStorage.setItem("assessmentCareer", career);

    localStorage.setItem("selectedCareerUpdatedAt", new Date().toISOString());

    /*
      Explicit flag showing that the user intentionally
      selected a career for the assessment.
    */

    localStorage.setItem("careerSelectedForAssessment", "true");

    /*
      Clear previous assessment data when the user chooses
      a different career.

      This is important because results from another career
      should not be reused for the newly selected career.
    */

    localStorage.removeItem("selfAssessmentAnswers");
    localStorage.removeItem("assessmentResults");
    localStorage.removeItem("adaptiveAssessmentResults");
    localStorage.removeItem("pathwiseSkillData");
    localStorage.removeItem("pathwiseProfileSkills");
    localStorage.removeItem("skillAssessmentCompleted");
    localStorage.removeItem("conceptualTestUnlocked");
    localStorage.removeItem("conceptualTestSkills");

    /*
      Pass the career through navigation state as well.

      This gives SkillAssessment.jsx an immediate source
      instead of relying only on localStorage.
    */

    navigate("/skill-assessment", {
      state: {
        career,
      },
    });
  };

  /* =======================================================
     OPEN ROADMAP DIRECTLY
  ======================================================= */

  const handleRoadmap = (career) => {
    /*
      Roadmap can still be opened directly from Career Explorer.

      This does NOT mark the career as selected specifically
      for assessment.
    */

    localStorage.setItem("selectedCareer", career);

    localStorage.setItem("assessmentCareer", career);

    localStorage.setItem("selectedCareerUpdatedAt", new Date().toISOString());

    navigate("/roadmap", {
      state: {
        career,
      },
    });
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =================================================
            BACK
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-primary-600"
        >
          ← Back to Dashboard
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">
          <p className="text-sm font-semibold tracking-wide text-primary-600">
            PATHWISE AI
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Career Explorer
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Explore different career paths, choose the one you are interested
            in, and then take a personalized skill assessment for that career.
          </p>
        </div>

        {/* =================================================
            CAREER-FIRST NOTICE
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
              🎯
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Choose your career before taking the assessment
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Your skill assessment is career-specific. Select the career you
                want to pursue first, then we will assess the skills required
                for that career.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            CAREERS
        ================================================= */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <div
              key={career.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
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

              {/* =================================================
                  ASSESSMENT BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={() => handleCareerSelection(career.title)}
                className="mt-6 w-full rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
              >
                Take Skill Assessment →
              </button>

              {/* =================================================
                  ROADMAP BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={() => handleRoadmap(career.title)}
                className="mt-3 w-full rounded-xl border border-primary-200 bg-white px-5 py-3 font-semibold text-primary-600 transition hover:bg-primary-50"
              >
                View Roadmap
              </button>
            </div>
          ))}
        </div>

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <div className="mt-10 rounded-2xl border border-primary-100 bg-primary-50 p-6">
          <h2 className="font-bold text-slate-900">How it works</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {/* STEP 1 */}

            <div className="rounded-xl bg-white/70 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                1
              </div>

              <p className="font-semibold text-primary-600">Choose a career</p>

              <p className="mt-1 text-sm leading-5 text-slate-600">
                Select the career you want to explore and build your skills
                toward.
              </p>
            </div>

            {/* STEP 2 */}

            <div className="rounded-xl bg-white/70 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                2
              </div>

              <p className="font-semibold text-primary-600">
                Take the assessment
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-600">
                Rate your skills and answer conceptual questions to verify your
                actual knowledge.
              </p>
            </div>

            {/* STEP 3 */}

            <div className="rounded-xl bg-white/70 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                3
              </div>

              <p className="font-semibold text-primary-600">
                Get your personalized roadmap
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-600">
                Identify your skill gaps and follow a learning path designed for
                your selected career.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM MESSAGE
        ================================================= */}

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            💡 Not sure which career to choose? Explore the descriptions above
            and select the one that interests you most.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CareerExploration;
