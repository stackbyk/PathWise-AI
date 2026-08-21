import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Circle,
  Target,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  RefreshCw,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

const CAREERS = [
  "Full Stack Developer",
  "Backend Developer",
  "AI / ML Engineer",
  "Data Scientist",
  "Cloud Engineer",
  "DevOps Engineer",
  "Cybersecurity Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
];

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9+#.]/g, "")
    .replace(/\s+/g, "");

const getCareer = () => {
  return (
    localStorage.getItem("selectedCareer") ||
    localStorage.getItem("assessmentCareer") ||
    "Full Stack Developer"
  );
};

const getRoadmap = (career) => {
  try {
    const storageKey = `pathwiseRoadmap_${career}`;
    const saved = localStorage.getItem(storageKey);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load roadmap:", error);
    return [];
  }
};

const getProfileSkills = () => {
  try {
    const saved = localStorage.getItem("pathwiseProfileSkills");

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((skill) => {
        if (typeof skill === "string") {
          return skill.trim();
        }

        return String(skill?.name || "").trim();
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Failed to load profile skills:", error);
    return [];
  }
};

function SkillGapAnalysis() {
  const [selectedCareer, setSelectedCareer] = useState(getCareer);
  const [roadmap, setRoadmap] = useState([]);
  const [profileSkills, setProfileSkills] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  /* =====================================================
     LOAD DATA
  ===================================================== */

  const loadData = () => {
    setRefreshing(true);

    const career =
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer";

    setSelectedCareer(career);
    setRoadmap(getRoadmap(career));
    setProfileSkills(getProfileSkills());

    setTimeout(() => {
      setRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("pathwiseRoadmapUpdated", handleUpdate);
    window.addEventListener("pathwiseCareerUpdated", handleUpdate);
    window.addEventListener("pathwiseProfileUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("pathwiseRoadmapUpdated", handleUpdate);
      window.removeEventListener("pathwiseCareerUpdated", handleUpdate);
      window.removeEventListener("pathwiseProfileUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  /* =====================================================
     ALL REQUIRED SKILLS FROM ROADMAP
  ===================================================== */

  const allRequiredSkills = useMemo(() => {
    return roadmap.flatMap((phase) =>
      Array.isArray(phase.skills)
        ? phase.skills.map((skill) => ({
            ...skill,
            phaseId: phase.id,
            phaseTitle: phase.title,
          }))
        : [],
    );
  }, [roadmap]);

  /* =====================================================
     PROFILE SKILL MATCHING
  ===================================================== */

  const analysis = useMemo(() => {
    const profileNormalized = profileSkills.map(normalize);

    return allRequiredSkills.map((skill, index) => {
      const roadmapCompleted =
        skill.completed === true || skill.isCompleted === true;

      const skillNameNormalized = normalize(skill.name);

      const profileMatch = profileNormalized.some((profileSkill) => {
        if (!profileSkill || !skillNameNormalized) return false;

        return (
          profileSkill === skillNameNormalized ||
          profileSkill.includes(skillNameNormalized) ||
          skillNameNormalized.includes(profileSkill)
        );
      });

      const hasSkill = roadmapCompleted || profileMatch;

      let priority = "Low";

      if (!hasSkill) {
        if (index < Math.ceil(allRequiredSkills.length * 0.35)) {
          priority = "High";
        } else if (index < Math.ceil(allRequiredSkills.length * 0.7)) {
          priority = "Medium";
        } else {
          priority = "Low";
        }
      }

      return {
        ...skill,
        hasSkill,
        priority,
      };
    });
  }, [allRequiredSkills, profileSkills]);

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const completedSkills = analysis.filter((skill) => skill.hasSkill);

  const missingSkills = analysis.filter((skill) => !skill.hasSkill);

  const highPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "High",
  );

  const mediumPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "Medium",
  );

  const lowPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "Low",
  );

  const readiness =
    analysis.length === 0
      ? 0
      : Math.round((completedSkills.length / analysis.length) * 100);

  /* =====================================================
     RECOMMENDED NEXT SKILL
  ===================================================== */

  const recommendedSkill =
    highPrioritySkills[0] ||
    mediumPrioritySkills[0] ||
    lowPrioritySkills[0] ||
    null;

  /* =====================================================
     CAREER CHANGE
  ===================================================== */

  const handleCareerChange = (career) => {
    localStorage.setItem("selectedCareer", career);

    setSelectedCareer(career);
    setRoadmap(getRoadmap(career));

    window.dispatchEvent(new Event("pathwiseCareerUpdated"));
  };

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  if (!roadmap.length) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold mb-8"
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <Brain className="text-indigo-600" size={32} />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mt-6">
              Skill Gap Analysis
            </h1>

            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Generate your personalized roadmap first. PathWise will then
              compare your current skills with the skills required for your
              target career.
            </p>

            <Link
              to="/roadmap"
              className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Open Roadmap
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* TOP NAV */}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold"
            >
              <ArrowLeft size={18} />
              Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={refreshing ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <Link
                to="/roadmap"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Roadmap
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 p-7 md:p-10 text-white shadow-xl">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-purple-500/20" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Brain size={26} className="text-indigo-200" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-indigo-300">
                  AI Career Analysis
                </p>

                <p className="text-sm text-indigo-200">
                  Personalized Skill Gap Analysis
                </p>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold mt-7">
              Find Your Skill Gaps 🎯
            </h1>

            <p className="text-indigo-200 mt-3 max-w-2xl leading-7">
              PathWise compares your current skills with the skills required for
              your target career and tells you exactly what to learn next.
            </p>

            <div className="mt-7 max-w-md">
              <label className="text-sm font-semibold text-indigo-200">
                Target Career
              </label>

              <select
                value={selectedCareer}
                onChange={(event) => handleCareerChange(event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {!CAREERS.includes(selectedCareer) && (
                  <option value={selectedCareer} className="text-slate-900">
                    {selectedCareer}
                  </option>
                )}

                {CAREERS.map((career) => (
                  <option
                    key={career}
                    value={career}
                    className="text-slate-900"
                  >
                    {career}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* =================================================
            READINESS
        ================================================= */}

        <section className="grid md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Target className="text-indigo-600" size={23} />
              </div>

              <span className="text-xs font-bold text-indigo-600">CAREER</span>
            </div>

            <p className="text-2xl font-bold mt-5 text-slate-900">
              {selectedCareer}
            </p>

            <p className="text-sm text-slate-500 mt-1">Target career</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle2 className="text-green-600" size={23} />
              </div>

              <span className="text-xs font-bold text-green-600">READY</span>
            </div>

            <p className="text-3xl font-bold mt-5">{completedSkills.length}</p>

            <p className="text-sm text-slate-500 mt-1">Skills matched</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="bg-red-100 p-3 rounded-xl">
                <AlertTriangle className="text-red-600" size={23} />
              </div>

              <span className="text-xs font-bold text-red-600">GAP</span>
            </div>

            <p className="text-3xl font-bold mt-5">{missingSkills.length}</p>

            <p className="text-sm text-slate-500 mt-1">Skills to learn</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <TrendingUp className="text-yellow-600" size={23} />
              </div>

              <span className="text-xs font-bold text-yellow-600">
                READINESS
              </span>
            </div>

            <p className="text-3xl font-bold mt-5">{readiness}%</p>

            <p className="text-sm text-slate-500 mt-1">Career readiness</p>
          </div>
        </section>

        {/* =================================================
            READINESS BAR
        ================================================= */}

        <section className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-slate-900">Career Readiness</h2>

              <p className="text-sm text-slate-500">
                Your current skills compared with the roadmap.
              </p>
            </div>

            <span className="text-2xl font-bold text-indigo-600">
              {readiness}%
            </span>
          </div>

          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700"
              style={{
                width: `${readiness}%`,
              }}
            />
          </div>
        </section>

        {/* =================================================
            RECOMMENDATION
        ================================================= */}

        {recommendedSkill && (
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-6 md:p-7 text-white shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <Sparkles size={21} />

                <span className="text-sm font-bold uppercase tracking-widest">
                  Recommended Next Skill
                </span>
              </div>

              <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <h2 className="text-2xl font-extrabold">
                    Learn {recommendedSkill.name}
                  </h2>

                  <p className="text-indigo-100 mt-2 max-w-2xl">
                    {recommendedSkill.description ||
                      `Develop ${recommendedSkill.name} to become more prepared for your target career.`}
                  </p>

                  <p className="text-xs text-indigo-200 mt-3">
                    Phase: {recommendedSkill.phaseTitle}
                  </p>
                </div>

                {recommendedSkill.resource && (
                  <a
                    href={recommendedSkill.resource}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 px-5 py-3 rounded-xl font-bold hover:bg-indigo-50 transition whitespace-nowrap"
                  >
                    <BookOpen size={18} />
                    Start Learning
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            HIGH PRIORITY
        ================================================= */}

        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={24} />
                High Priority Skills
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Skills you should focus on first.
              </p>
            </div>

            <span className="rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">
              {highPrioritySkills.length} gaps
            </span>
          </div>

          {highPrioritySkills.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-green-800">
              🎉 Great job! You don't currently have any high-priority skill
              gaps.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {highPrioritySkills.map((skill) => (
                <SkillCard
                  key={skill.id || skill.name}
                  skill={skill}
                  priority="High"
                />
              ))}
            </div>
          )}
        </section>

        {/* =================================================
            MEDIUM + LOW
        ================================================= */}

        <section className="grid lg:grid-cols-2 gap-6">
          {/* MEDIUM */}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Medium Priority
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Build these skills after your high-priority gaps.
                </p>
              </div>

              <span className="rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-xs font-bold">
                {mediumPrioritySkills.length}
              </span>
            </div>

            <div className="space-y-3">
              {mediumPrioritySkills.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No medium-priority gaps 🎉
                </p>
              ) : (
                mediumPrioritySkills.map((skill) => (
                  <MiniSkillCard
                    key={skill.id || skill.name}
                    skill={skill}
                    priority="Medium"
                  />
                ))
              )}
            </div>
          </div>

          {/* LOW */}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Lower Priority
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Useful skills to learn later.
                </p>
              </div>

              <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-bold">
                {lowPrioritySkills.length}
              </span>
            </div>

            <div className="space-y-3">
              {lowPrioritySkills.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No lower-priority gaps 🎉
                </p>
              ) : (
                lowPrioritySkills.map((skill) => (
                  <MiniSkillCard
                    key={skill.id || skill.name}
                    skill={skill}
                    priority="Low"
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            ALL SKILLS
        ================================================= */}

        <section className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={23} />
                Complete Skill Analysis
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Every skill required by your {selectedCareer} roadmap.
              </p>
            </div>

            <span className="text-sm font-bold text-slate-500">
              {completedSkills.length}/{analysis.length}
            </span>
          </div>

          <div className="space-y-3">
            {analysis.map((skill) => (
              <div
                key={skill.id || skill.name}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  skill.hasSkill
                    ? "bg-green-50 border-green-100"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div>
                  {skill.hasSkill ? (
                    <CheckCircle2 size={21} className="text-green-500" />
                  ) : (
                    <Circle size={21} className="text-slate-300" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800">{skill.name}</p>

                  <p className="text-xs text-slate-500 mt-1">
                    {skill.phaseTitle}
                  </p>
                </div>

                {skill.hasSkill ? (
                  <span className="flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-bold">
                    <CheckCircle2 size={13} />
                    Matched
                  </span>
                ) : (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      skill.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : skill.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {skill.priority}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            FOOTER CTA
        ================================================= */}

        <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-7 text-center text-white">
          <Zap className="mx-auto text-yellow-300" size={30} />

          <h2 className="text-2xl font-bold mt-3">
            Ready to close your skill gaps?
          </h2>

          <p className="text-slate-300 mt-2">
            Continue your roadmap and turn your missing skills into strengths.
          </p>

          <Link
            to="/roadmap"
            className="mt-5 inline-flex items-center gap-2 bg-white text-indigo-800 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition"
          >
            Continue Roadmap
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}

/* =====================================================
   SKILL CARD
===================================================== */

function SkillCard({ skill, priority }) {
  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-md p-5">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="text-red-600" size={22} />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold text-slate-900">{skill.name}</h3>

            <span className="rounded-full bg-red-100 text-red-700 px-2.5 py-1 text-xs font-bold">
              {priority}
            </span>
          </div>

          <p className="text-sm text-slate-500 mt-2 leading-6">
            {skill.description ||
              `Learn ${skill.name} to improve your career readiness.`}
          </p>

          <p className="text-xs text-slate-400 mt-3">
            Phase: {skill.phaseTitle}
          </p>

          {skill.resource && (
            <a
              href={skill.resource}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              <BookOpen size={16} />
              Learning Resource
              <ArrowRight size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   MINI SKILL CARD
===================================================== */

function MiniSkillCard({ skill, priority }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
      <Circle
        size={18}
        className={priority === "Medium" ? "text-yellow-500" : "text-blue-500"}
      />

      <div className="flex-1">
        <p className="font-semibold text-sm text-slate-800">{skill.name}</p>

        <p className="text-xs text-slate-500 mt-1">{skill.phaseTitle}</p>
      </div>

      {skill.resource && (
        <a
          href={skill.resource}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 hover:text-indigo-800"
          title="Open learning resource"
        >
          <BookOpen size={17} />
        </a>
      )}
    </div>
  );
}

export default SkillGapAnalysis;
