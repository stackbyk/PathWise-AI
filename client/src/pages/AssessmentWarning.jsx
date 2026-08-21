import { useLocation, useNavigate } from "react-router-dom";
import { Brain, Clock3, ShieldCheck, ArrowRight } from "lucide-react";

/* =========================================================
   CAREER NORMALIZATION
========================================================= */

const normalizeCareer = (career) => {
  if (!career) return null;

  const normalized = career
    .trim()
    .toLowerCase()
    .replace(/[\/\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const careers = {
    "backend developer": "Backend Developer",
    backend: "Backend Developer",
    "backend engineer": "Backend Developer",

    "frontend developer": "Frontend Developer",
    frontend: "Frontend Developer",
    "frontend engineer": "Frontend Developer",

    "full stack developer": "Full Stack Developer",
    "full stack": "Full Stack Developer",

    "ai ml engineer": "AI/ML Engineer",
    "ai ml": "AI/ML Engineer",
    "machine learning engineer": "AI/ML Engineer",
    "ml engineer": "AI/ML Engineer",
    "artificial intelligence engineer": "AI/ML Engineer",

    "data scientist": "Data Scientist",
    "data science": "Data Scientist",
    "data analyst": "Data Scientist",

    "cloud engineer": "Cloud Engineer",
    cloud: "Cloud Engineer",

    "devops engineer": "DevOps Engineer",
    devops: "DevOps Engineer",

    cybersecurity: "Cybersecurity Engineer",
    "cybersecurity engineer": "Cybersecurity Engineer",
    "cyber security": "Cybersecurity Engineer",
    "security engineer": "Cybersecurity Engineer",

    "mobile developer": "Mobile Developer",
    "mobile app developer": "Mobile Developer",
    "app developer": "Mobile Developer",

    "ui ux designer": "UI/UX Designer",
    designer: "UI/UX Designer",
  };

  return careers[normalized] || career;
};

/* =========================================================
   COMPONENT
========================================================= */

function AssessmentWarning() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =======================================================
     CAREER
  ======================================================= */

  const stateCareer =
    location.state?.career ||
    location.state?.assessmentCareer ||
    location.state?.assessmentData?.career;

  const storedCareer =
    localStorage.getItem("assessmentCareer") ||
    localStorage.getItem("selectedCareer") ||
    localStorage.getItem("career");

  const career = normalizeCareer(stateCareer || storedCareer);

  /* =======================================================
     START
  ======================================================= */

  const handleStart = () => {
    if (!career) {
      navigate("/career-explorer");
      return;
    }

    /*
      Keep the canonical career available for the
      conceptual verification test.
    */

    localStorage.setItem("selectedCareer", career);
    localStorage.setItem("assessmentCareer", career);

    navigate("/mcq-verification", {
      state: {
        career,
      },
    });
  };

  /* =======================================================
     NO CAREER SAFETY
  ======================================================= */

  if (!career) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl md:p-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50">
              <Brain className="text-indigo-600" size={40} />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Assessment Career Not Found
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Please select a career before starting the skill verification
              assessment.
            </p>

            <button
              onClick={() => navigate("/career-explorer")}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white transition hover:bg-indigo-700"
            >
              Explore Careers
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          {/* ICON */}

          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50">
              <Brain className="text-indigo-600" size={40} />
            </div>
          </div>

          {/* TITLE */}

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Self Assessment Completed
            </p>

            <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Let's verify what you actually know 🧠
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              You have completed your skill-level assessment for{" "}
              <span className="font-semibold text-indigo-600">{career}</span>.
            </p>
          </div>

          {/* INFO CARD */}

          <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">What's next?</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              We will now ask you conceptual and practical multiple-choice
              questions based on the skill levels you selected.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              This helps PathWise understand what you actually know before
              generating your personalized learning roadmap.
            </p>
          </div>

          {/* FEATURES */}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-5">
              <Clock3 className="text-indigo-600" size={24} />

              <h3 className="mt-3 font-bold text-slate-900">10 seconds</h3>

              <p className="mt-1 text-sm text-slate-500">
                Each question has a time limit.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <Brain className="text-indigo-600" size={24} />

              <h3 className="mt-3 font-bold text-slate-900">
                Conceptual Questions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Questions test your actual understanding.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <ShieldCheck className="text-indigo-600" size={24} />

              <h3 className="mt-3 font-bold text-slate-900">
                Skill Verification
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Your answers help determine your verified level.
              </p>
            </div>
          </div>

          {/* WARNING */}

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm leading-6 text-amber-800">
              <strong>Important:</strong> Answer the questions yourself. The
              assessment is timed and questions may vary between users. Your
              result will be used to personalize your roadmap.
            </p>
          </div>

          {/* BUTTON */}

          <button
            onClick={handleStart}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white transition hover:bg-indigo-700"
          >
            Start Verification Test
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-3 w-full rounded-xl px-6 py-3 font-semibold text-slate-500 hover:bg-slate-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssessmentWarning;
