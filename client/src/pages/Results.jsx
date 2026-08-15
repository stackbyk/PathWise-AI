import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

function Results() {
  /* =====================================================
     LOAD CAREER
  ===================================================== */

  const selectedCareer =
    localStorage.getItem("assessmentCareer") ||
    localStorage.getItem("selectedCareer") ||
    "Full Stack Developer";

  /* =====================================================
     LOAD SKILL DATA
  ===================================================== */

  let skillData = [];

  try {
    const savedSkillData = localStorage.getItem("pathwiseSkillData");

    if (savedSkillData) {
      const parsedSkillData = JSON.parse(savedSkillData);

      if (Array.isArray(parsedSkillData)) {
        skillData = parsedSkillData;
      }
    }
  } catch (error) {
    console.error("Failed to load skill data:", error);
  }

  /* =====================================================
     FALLBACK TO OLD ASSESSMENT DATA
  ===================================================== */

  if (skillData.length === 0) {
    try {
      const savedAnswers = localStorage.getItem("assessmentResults");

      const answers = JSON.parse(savedAnswers || "{}");

      skillData = Object.entries(answers).map(([name, progress]) => {
        let level = "Beginner";

        if (progress >= 100) {
          level = "Advanced";
        } else if (progress >= 75) {
          level = "Intermediate";
        } else if (progress >= 50) {
          level = "Basic";
        }

        return {
          name,
          progress: Number(progress),
          level,
          source: "assessment",
        };
      });
    } catch (error) {
      console.error("Failed to load assessment results:", error);
    }
  }

  /* =====================================================
     ONLY ASSESSED SKILLS
  ===================================================== */

  const assessedSkills = skillData.filter(
    (skill) =>
      skill.source === "assessment" || typeof skill.progress === "number",
  );

  /* =====================================================
     OVERALL SCORE
  ===================================================== */

  const overallScore =
    assessedSkills.length > 0
      ? Math.round(
          assessedSkills.reduce(
            (total, skill) => total + Number(skill.progress || 0),
            0,
          ) / assessedSkills.length,
        )
      : 0;

  /* =====================================================
     STRONG SKILLS
  ===================================================== */

  const strongSkills = assessedSkills.filter(
    (skill) => Number(skill.progress) >= 75,
  );

  /* =====================================================
     SKILL GAPS
  ===================================================== */

  const skillGaps = assessedSkills.filter(
    (skill) => Number(skill.progress) < 75,
  );

  /* =====================================================
     PRIORITY SKILLS
  ===================================================== */

  const prioritySkills = [...skillGaps].sort(
    (a, b) => Number(a.progress || 0) - Number(b.progress || 0),
  );

  /* =====================================================
     SAVE PERSONALIZATION DATA
  ===================================================== */

  const saveAssessmentPersonalization = () => {
    try {
      localStorage.setItem(
        "pathwiseAssessmentSummary",
        JSON.stringify({
          career: selectedCareer,
          overallScore,
          strongSkills: strongSkills.map((skill) => ({
            name: skill.name,
            progress: Number(skill.progress || 0),
            level: skill.level || getLevel(Number(skill.progress || 0)),
          })),
          skillGaps: skillGaps.map((skill) => ({
            name: skill.name,
            progress: Number(skill.progress || 0),
            level: skill.level || getLevel(Number(skill.progress || 0)),
          })),
          prioritySkills: prioritySkills.map((skill) => ({
            name: skill.name,
            progress: Number(skill.progress || 0),
          })),
          updatedAt: new Date().toISOString(),
        }),
      );

      localStorage.setItem(
        "pathwiseSkillGaps",
        JSON.stringify(
          skillGaps.map((skill) => ({
            name: skill.name,
            progress: Number(skill.progress || 0),
          })),
        ),
      );

      localStorage.setItem(
        "pathwiseStrongSkills",
        JSON.stringify(
          strongSkills.map((skill) => ({
            name: skill.name,
            progress: Number(skill.progress || 0),
          })),
        ),
      );
    } catch (error) {
      console.error("Failed to save assessment personalization:", error);
    }
  };

  /* =====================================================
     GENERATE ROADMAP
  ===================================================== */

  const handleGenerateRoadmap = () => {
    /* -----------------------------------------------------
       SAVE CAREER
    ----------------------------------------------------- */

    localStorage.setItem("selectedCareer", selectedCareer);

    localStorage.setItem("assessmentCareer", selectedCareer);

    localStorage.setItem("recommendedCareer", selectedCareer);

    /* -----------------------------------------------------
       SAVE CAREER RECOMMENDATION
    ----------------------------------------------------- */

    localStorage.setItem(
      "careerRecommendation",
      JSON.stringify({
        career: selectedCareer,
        score: overallScore,
        source: "skill-assessment",
        createdAt: new Date().toISOString(),
      }),
    );

    /* -----------------------------------------------------
       SAVE PERSONALIZATION
    ----------------------------------------------------- */

    saveAssessmentPersonalization();

    /* -----------------------------------------------------
       SAVE COMPLETE ASSESSMENT SUMMARY
    ----------------------------------------------------- */

    localStorage.setItem(
      "pathwiseAssessmentResults",
      JSON.stringify({
        career: selectedCareer,
        overallScore,
        assessedSkills,
        strongSkills,
        skillGaps,
        prioritySkills,
        completedAt: new Date().toISOString(),
      }),
    );

    /* -----------------------------------------------------
       OPEN ROADMAP
    ----------------------------------------------------- */

    window.location.href = "/roadmap";
  };

  /* =====================================================
     LEVEL
  ===================================================== */

  function getLevel(score) {
    if (score >= 100) {
      return "Advanced";
    }

    if (score >= 75) {
      return "Intermediate";
    }

    if (score >= 50) {
      return "Basic";
    }

    return "Beginner";
  }

  /* =====================================================
     BAR COLOR
  ===================================================== */

  const getBarColor = (score) => {
    if (score >= 75) {
      return "bg-green-500";
    }

    if (score >= 50) {
      return "bg-yellow-500";
    }

    return "bg-red-500";
  };

  /* =====================================================
     RESULT MESSAGE
  ===================================================== */

  const resultMessage = useMemo(() => {
    if (overallScore >= 75) {
      return "Great foundation! You are well prepared to continue toward your target career.";
    }

    if (overallScore >= 50) {
      return "You have a good foundation, but there are some important skills to strengthen.";
    }

    return "You are at the beginning of your journey. Your personalized roadmap will help you build the required skills step by step.";
  }, [overallScore]);

  return (
    <div className="py-8">
      {/* =================================================
          BACK
      ================================================= */}

      <Link
        to="/assessment"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Assessment
      </Link>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <CheckCircle2 size={17} />
          Assessment Complete
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Your Skill Analysis
        </h1>

        <p className="text-slate-600 mt-3">
          Here's how your current skills compare with the requirements for{" "}
          <span className="font-semibold text-primary-600">
            {selectedCareer}
          </span>
          .
        </p>
      </div>

      {/* =================================================
          OVERALL SCORE
      ================================================= */}

      <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target size={22} />

              <span className="font-medium">Overall Skill Score</span>
            </div>

            <div className="text-5xl font-bold">{overallScore}%</div>

            <p className="text-indigo-100 mt-3 max-w-lg">{resultMessage}</p>
          </div>

          <div className="w-32 h-32 rounded-full border-8 border-white/30 flex items-center justify-center">
            <div className="text-3xl font-bold">{overallScore}%</div>
          </div>
        </div>
      </div>

      {/* =================================================
          PERSONALIZED FOCUS
      ================================================= */}

      {prioritySkills.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-primary-100 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Zap size={21} className="text-primary-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Your Learning Focus
              </h2>

              <p className="text-sm text-slate-500">
                These skills should receive the most attention on your roadmap.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {prioritySkills.slice(0, 4).map((skill, index) => (
              <div
                key={skill.name}
                className="flex items-center justify-between rounded-xl bg-primary-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>

                  <span className="font-semibold text-slate-800">
                    {skill.name}
                  </span>
                </div>

                <span className="font-bold text-primary-600">
                  {skill.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================
          SKILL BREAKDOWN
      ================================================= */}

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-primary-600" size={24} />

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Skill Breakdown
            </h2>

            <p className="text-sm text-slate-500">
              Your current proficiency in each assessed skill.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {assessedSkills.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No assessment results found.</p>

              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
              >
                Take Assessment
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            assessedSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-slate-800">{skill.name}</p>

                    <p className="text-xs text-slate-500">
                      {skill.level || getLevel(skill.progress)}
                    </p>
                  </div>

                  <span className="font-bold text-slate-700">
                    {skill.progress}%
                  </span>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getBarColor(
                      skill.progress,
                    )}`}
                    style={{
                      width: `${skill.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* =================================================
          STRONG SKILLS + SKILL GAPS
      ================================================= */}

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
        {/* STRENGTHS */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle2 className="text-green-500" size={23} />

            <div>
              <h2 className="font-bold text-lg">Your Strengths</h2>

              <p className="text-sm text-slate-500">
                Skills you're already comfortable with.
              </p>
            </div>
          </div>

          {strongSkills.length > 0 ? (
            <div className="space-y-3">
              {strongSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex justify-between items-center bg-green-50 rounded-xl px-4 py-3"
                >
                  <span className="font-medium text-green-800">
                    {skill.name}
                  </span>

                  <span className="font-bold text-green-600">
                    {skill.progress}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">
              Keep learning — you'll build your strengths along the roadmap.
            </p>
          )}
        </div>

        {/* GAPS */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <AlertTriangle className="text-orange-500" size={23} />

            <div>
              <h2 className="font-bold text-lg">Skill Gaps</h2>

              <p className="text-sm text-slate-500">
                Skills that need more development.
              </p>
            </div>
          </div>

          {skillGaps.length > 0 ? (
            <div className="space-y-3">
              {skillGaps.map((skill) => (
                <div
                  key={skill.name}
                  className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-3"
                >
                  <span className="font-medium text-orange-800">
                    {skill.name}
                  </span>

                  <span className="font-bold text-orange-600">
                    {skill.progress}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-green-600 font-medium">
              🎉 No major skill gaps identified!
            </p>
          )}
        </div>
      </div>

      {/* =================================================
          NEXT STEP
      ================================================= */}

      <div className="max-w-4xl mx-auto text-center bg-slate-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold">
          Ready for your personalized roadmap?
        </h2>

        <p className="text-slate-300 mt-2 mb-6">
          Your assessment results will be used to personalize your learning
          focus.
        </p>

        <button
          onClick={handleGenerateRoadmap}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 px-6 py-3 rounded-xl font-semibold transition"
        >
          Generate My Roadmap
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Results;
