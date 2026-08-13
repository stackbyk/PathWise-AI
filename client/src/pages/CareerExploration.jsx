import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Brain,
  Database,
  ShieldCheck,
  Cloud,
  BarChart3,
} from "lucide-react";

function CareerExploration() {
  const navigate = useNavigate();

  const careers = [
    {
      title: "Full Stack Developer",
      description:
        "Build complete web applications across frontend, backend, and databases.",
      skills: ["React", "Node.js", "MongoDB"],
      icon: Code2,
    },
    {
      title: "AI / ML Engineer",
      description:
        "Build intelligent systems using machine learning and artificial intelligence.",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      icon: Brain,
    },
    {
      title: "Data Scientist",
      description:
        "Analyze data and build models that help organizations make better decisions.",
      skills: ["Python", "Statistics", "Machine Learning"],
      icon: BarChart3,
    },
    {
      title: "Backend Developer",
      description:
        "Design APIs, databases, and server-side systems for modern applications.",
      skills: ["Node.js", "APIs", "Databases"],
      icon: Database,
    },
    {
      title: "Cybersecurity Engineer",
      description:
        "Protect applications, networks, and systems from security threats.",
      skills: ["Networking", "Linux", "Security"],
      icon: ShieldCheck,
    },
    {
      title: "Cloud Engineer",
      description:
        "Build and manage scalable cloud infrastructure and services.",
      skills: ["AWS", "Docker", "Linux"],
      icon: Cloud,
    },
  ];

  const selectCareer = (career) => {
    // Temporary selection.
    // We will save this to the backend later.
    localStorage.setItem("selectedCareer", career.title);

    navigate("/assessment");
  };

  return (
    <div className="py-8">
      {/* Back */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Brain size={17} />
          Career Exploration
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Choose Your Career Path
        </h1>

        <p className="text-slate-600 mt-3">
          Select a career you're interested in. We'll analyze the skills
          required and create a personalized roadmap for you.
        </p>
      </div>

      {/* Career Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career) => {
          const Icon = career.icon;

          return (
            <div
              key={career.title}
              className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-5">
                <Icon size={25} className="text-primary-600" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900">
                {career.title}
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                {career.description}
              </p>

              {/* Skills */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                  Key Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => selectCareer(career)}
                className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                Choose Career
                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CareerExploration;
