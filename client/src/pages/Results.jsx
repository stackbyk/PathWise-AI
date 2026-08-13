import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Target,
  TrendingUp,
} from "lucide-react";

function Results() {
  const selectedCareer =
    localStorage.getItem("selectedCareer") || "Full-Stack Developer";

  const answers = JSON.parse(localStorage.getItem("assessmentResults") || "{}");

  const skills = Object.entries(answers);

  const overallScore =
    skills.length > 0
      ? Math.round(
          skills.reduce((total, [, score]) => total + score, 0) / skills.length,
        )
      : 0;

  const strongSkills = skills.filter(([, score]) => score >= 75);

  const skillGaps = skills.filter(([, score]) => score < 75);

  const getLevel = (score) => {
    if (score >= 100) return "Advanced";
    if (score >= 75) return "Intermediate";
    if (score >= 50) return "Basic";
    return "Beginner";
  };

  const getBarColor = (score) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

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
      {/* Back */}
      <Link
        to="/assessment"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Assessment
      </Link>

      {/* Header */}
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

      {/* Overall Score */}
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

      {/* Skills */}
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
          {skills.length === 0 ? (
            <p className="text-slate-500">
              No assessment results found. Please complete the assessment first.
            </p>
          ) : (
            skills.map(([skill, score]) => (
              <div key={skill}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-slate-800">{skill}</p>

                    <p className="text-xs text-slate-500">{getLevel(score)}</p>
                  </div>

                  <span className="font-bold text-slate-700">{score}%</span>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getBarColor(score)}`}
                    style={{
                      width: `${score}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Strong Skills + Gaps */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
        {/* Strong */}
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
              {strongSkills.map(([skill, score]) => (
                <div
                  key={skill}
                  className="flex justify-between items-center bg-green-50 rounded-xl px-4 py-3"
                >
                  <span className="font-medium text-green-800">{skill}</span>

                  <span className="font-bold text-green-600">{score}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">
              Keep learning — you'll build your strengths along the roadmap.
            </p>
          )}
        </div>

        {/* Gaps */}
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
              {skillGaps.map(([skill, score]) => (
                <div
                  key={skill}
                  className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-3"
                >
                  <span className="font-medium text-orange-800">{skill}</span>

                  <span className="font-bold text-orange-600">{score}%</span>
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

      {/* CTA */}
      <div className="max-w-4xl mx-auto text-center bg-slate-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold">
          Ready for your personalized roadmap?
        </h2>

        <p className="text-slate-300 mt-2 mb-6">
          We'll turn your skill gaps into a step-by-step learning path.
        </p>

        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 px-6 py-3 rounded-xl font-semibold transition"
        >
          Generate My Roadmap
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default Results;
