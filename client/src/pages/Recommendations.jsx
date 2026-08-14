import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Target, Trophy } from "lucide-react";

const careerSkills = {
  "Full Stack Developer": [
    "HTML & CSS",
    "JavaScript",
    "React",
    "Node.js",
    "REST APIs",
    "MongoDB",
    "Git & GitHub",
    "Problem Solving",
  ],

  "Cybersecurity Engineer": [
    "Cybersecurity Fundamentals",
    "Networking",
    "Linux",
    "Network Security",
    "Ethical Hacking",
    "Threat Detection",
    "Python & Scripting",
    "Incident Response",
  ],

  "AI / ML Engineer": [
    "Python",
    "Mathematics",
    "Statistics",
    "Machine Learning",
    "Deep Learning",
    "Data Processing",
    "Model Evaluation",
    "TensorFlow / PyTorch",
  ],

  "Data Scientist": [
    "Python",
    "Statistics",
    "SQL",
    "Data Analysis",
    "Data Visualization",
    "Machine Learning",
    "Pandas / NumPy",
    "Problem Solving",
  ],

  "Backend Developer": [
    "Programming",
    "Node.js",
    "REST APIs",
    "Databases",
    "Authentication",
    "Server Architecture",
    "Git & GitHub",
    "Problem Solving",
  ],

  "Cloud Engineer": [
    "Linux",
    "Networking",
    "AWS / Azure / GCP",
    "Docker",
    "Kubernetes",
    "Cloud Security",
    "CI/CD",
    "Infrastructure",
  ],
};

const learningResources = {
  "HTML & CSS":
    "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  React: "https://react.dev/learn",
  "Node.js": "https://nodejs.org/en/learn",
  "REST APIs": "https://developer.mozilla.org/en-US/docs/Web/HTTP",
  MongoDB: "https://learn.mongodb.com/",
  "Git & GitHub": "https://skills.github.com/",
  "Cybersecurity Fundamentals": "https://owasp.org/",
  Networking: "https://www.netacad.com/courses/networking-basics",
  Linux: "https://linuxjourney.com/",
  "Network Security": "https://www.cloudflare.com/learning/security/",
  "Ethical Hacking": "https://portswigger.net/web-security",
  "Threat Detection": "https://attack.mitre.org/",
  "Python & Scripting": "https://docs.python.org/3/tutorial/",
  "Incident Response":
    "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final",
  Python: "https://docs.python.org/3/tutorial/",
  Mathematics: "https://www.khanacademy.org/math",
  Statistics: "https://www.khanacademy.org/math/statistics-probability",
  "Machine Learning":
    "https://developers.google.com/machine-learning/crash-course",
  "Deep Learning": "https://www.deeplearning.ai/",
  "Data Processing": "https://pandas.pydata.org/docs/",
  "Model Evaluation":
    "https://developers.google.com/machine-learning/crash-course",
  "TensorFlow / PyTorch": "https://pytorch.org/tutorials/",
  SQL: "https://www.postgresql.org/docs/",
  "Data Analysis": "https://pandas.pydata.org/docs/",
  "Data Visualization": "https://matplotlib.org/stable/users/index.html",
  "Pandas / NumPy": "https://pandas.pydata.org/docs/",
  Programming: "https://www.freecodecamp.org/learn/",
  Databases: "https://learn.mongodb.com/",
  Authentication: "https://firebase.google.com/docs/auth",
  "Server Architecture":
    "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
  "AWS / Azure / GCP": "https://aws.amazon.com/training/",
  Docker: "https://docs.docker.com/get-started/",
  Kubernetes: "https://kubernetes.io/docs/tutorials/",
  "Cloud Security": "https://aws.amazon.com/security/",
  "CI/CD": "https://docs.github.com/en/actions",
  Infrastructure: "https://aws.amazon.com/getting-started/hands-on/",
};

function Recommendations() {
  const navigate = useNavigate();

  const selectedCareer =
    localStorage.getItem("selectedCareer") ||
    localStorage.getItem("assessmentCareer") ||
    "Full Stack Developer";

  const recommendations = useMemo(() => {
    let results = {};

    try {
      results = JSON.parse(localStorage.getItem("assessmentResults") || "{}");
    } catch {
      results = {};
    }

    const skills =
      careerSkills[selectedCareer] || careerSkills["Full Stack Developer"];

    return skills
      .map((skill) => ({
        skill,
        score: Number(results[skill] || 0),
      }))
      .sort((a, b) => a.score - b.score);
  }, [selectedCareer]);

  const weakSkills = recommendations.filter((item) => item.score < 75);

  const strongSkills = recommendations.filter((item) => item.score >= 75);

  const getLevel = (score) => {
    if (score === 0) return "Not Assessed";
    if (score <= 25) return "Beginner";
    if (score <= 50) return "Basic";
    if (score <= 75) return "Intermediate";
    return "Advanced";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 font-semibold text-slate-600 hover:text-primary-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-primary-600">PATHWISE AI</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            AI Recommendations
          </h1>

          <p className="mt-2 text-slate-600">
            Personalized recommendations for your{" "}
            <span className="font-semibold text-primary-600">
              {selectedCareer}
            </span>{" "}
            career path.
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <Target className="mx-auto text-primary-600" size={40} />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Complete your skill assessment first
            </h2>

            <p className="mt-2 text-slate-600">
              Your recommendations will be generated from your assessment
              results.
            </p>

            <button
              onClick={() => navigate("/skill-assessment")}
              className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"
            >
              Take Skill Assessment
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl bg-red-50 p-5">
                <p className="text-sm text-slate-600">Skills to Improve</p>

                <p className="mt-1 text-3xl font-bold text-red-600">
                  {weakSkills.length}
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-5">
                <p className="text-sm text-slate-600">Strong Skills</p>

                <p className="mt-1 text-3xl font-bold text-green-600">
                  {strongSkills.length}
                </p>
              </div>

              <div className="rounded-2xl bg-indigo-50 p-5">
                <p className="text-sm text-slate-600">Career</p>

                <p className="mt-1 font-bold text-primary-600">
                  {selectedCareer}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-slate-900">
                  What you should learn next
                </h2>

                <p className="mt-1 text-slate-600">
                  These recommendations are based on your lowest assessment
                  scores.
                </p>
              </div>

              <div className="space-y-4">
                {weakSkills.map((item, index) => {
                  const resource =
                    learningResources[item.skill] || "https://www.google.com/";

                  return (
                    <div
                      key={item.skill}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 font-bold text-primary-600">
                            {index + 1}
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {item.skill}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              Current level:{" "}
                              <span className="font-semibold">
                                {getLevel(item.score)}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-2xl font-bold text-primary-600">
                            {item.score}%
                          </p>

                          <p className="text-xs text-slate-500">Skill score</p>
                        </div>
                      </div>

                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary-600"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <a
                          href={resource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
                        >
                          <BookOpen size={16} />
                          Learn This Skill
                        </a>

                        <button
                          onClick={() => navigate("/roadmap")}
                          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          View Roadmap
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {weakSkills.length === 0 && (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                <Trophy className="mx-auto text-green-600" size={42} />

                <h2 className="mt-4 text-2xl font-bold text-green-800">
                  Excellent work! 🎉
                </h2>

                <p className="mt-2 text-green-700">
                  You have reached Intermediate or Advanced level in all
                  assessed skills.
                </p>
              </div>
            )}

            <div className="mt-8 rounded-2xl bg-primary-600 p-6 text-white">
              <h2 className="text-xl font-bold">Keep improving 🚀</h2>

              <p className="mt-2 text-sm text-primary-100">
                Follow your roadmap, complete learning steps and earn XP.
              </p>

              <button
                onClick={() => navigate("/roadmap")}
                className="mt-5 rounded-xl bg-white px-6 py-3 font-semibold text-primary-600 hover:bg-slate-100"
              >
                Continue Roadmap
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recommendations;
