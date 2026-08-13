import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Brain, CheckCircle2 } from "lucide-react";

const careerQuestions = {
  "Full Stack Developer": [
    {
      skill: "HTML & CSS",
      question: "How comfortable are you with HTML and CSS?",
    },
    {
      skill: "JavaScript",
      question: "How comfortable are you with JavaScript?",
    },
    {
      skill: "React",
      question: "How comfortable are you with React?",
    },
    {
      skill: "Node.js",
      question: "How comfortable are you with Node.js?",
    },
    {
      skill: "REST APIs",
      question: "How comfortable are you with REST APIs?",
    },
    {
      skill: "MongoDB",
      question: "How comfortable are you with MongoDB?",
    },
    {
      skill: "Git & GitHub",
      question: "How comfortable are you with Git and GitHub?",
    },
    {
      skill: "Problem Solving",
      question: "How comfortable are you with programming problem solving?",
    },
  ],

  "Cybersecurity Engineer": [
    {
      skill: "Cybersecurity Fundamentals",
      question: "How comfortable are you with basic cybersecurity concepts?",
    },
    {
      skill: "Networking",
      question:
        "How comfortable are you with computer networking and protocols?",
    },
    {
      skill: "Linux",
      question: "How comfortable are you with Linux systems and commands?",
    },
    {
      skill: "Network Security",
      question:
        "How comfortable are you with firewalls, VPNs and network security?",
    },
    {
      skill: "Ethical Hacking",
      question:
        "How comfortable are you with penetration testing and ethical hacking concepts?",
    },
    {
      skill: "Threat Detection",
      question:
        "How comfortable are you with identifying and analyzing security threats?",
    },
    {
      skill: "Python & Scripting",
      question:
        "How comfortable are you with Python or scripting for security tasks?",
    },
    {
      skill: "Incident Response",
      question:
        "How comfortable are you with detecting and responding to security incidents?",
    },
  ],

  "AI / ML Engineer": [
    {
      skill: "Python",
      question: "How comfortable are you with Python programming?",
    },
    {
      skill: "Mathematics",
      question:
        "How comfortable are you with the mathematics used in machine learning?",
    },
    {
      skill: "Statistics",
      question: "How comfortable are you with statistics and probability?",
    },
    {
      skill: "Machine Learning",
      question: "How comfortable are you with machine learning concepts?",
    },
    {
      skill: "Deep Learning",
      question:
        "How comfortable are you with neural networks and deep learning?",
    },
    {
      skill: "Data Processing",
      question:
        "How comfortable are you with preparing and processing datasets?",
    },
    {
      skill: "Model Evaluation",
      question:
        "How comfortable are you with evaluating machine learning models?",
    },
    {
      skill: "TensorFlow / PyTorch",
      question:
        "How comfortable are you with ML frameworks such as TensorFlow or PyTorch?",
    },
  ],

  "Data Scientist": [
    {
      skill: "Python",
      question: "How comfortable are you with Python for data analysis?",
    },
    {
      skill: "Statistics",
      question: "How comfortable are you with statistics and probability?",
    },
    {
      skill: "SQL",
      question: "How comfortable are you with SQL and databases?",
    },
    {
      skill: "Data Analysis",
      question: "How comfortable are you with analyzing datasets?",
    },
    {
      skill: "Data Visualization",
      question: "How comfortable are you with creating data visualizations?",
    },
    {
      skill: "Machine Learning",
      question: "How comfortable are you with machine learning algorithms?",
    },
    {
      skill: "Pandas / NumPy",
      question: "How comfortable are you with Pandas and NumPy?",
    },
    {
      skill: "Problem Solving",
      question: "How comfortable are you with solving analytical problems?",
    },
  ],

  "Backend Developer": [
    {
      skill: "Programming",
      question: "How comfortable are you with backend programming?",
    },
    {
      skill: "Node.js",
      question: "How comfortable are you with Node.js?",
    },
    {
      skill: "REST APIs",
      question: "How comfortable are you with designing REST APIs?",
    },
    {
      skill: "Databases",
      question: "How comfortable are you with relational and NoSQL databases?",
    },
    {
      skill: "Authentication",
      question:
        "How comfortable are you with authentication and authorization?",
    },
    {
      skill: "Server Architecture",
      question: "How comfortable are you with backend and server architecture?",
    },
    {
      skill: "Git & GitHub",
      question: "How comfortable are you with Git and GitHub?",
    },
    {
      skill: "Problem Solving",
      question: "How comfortable are you with backend problem solving?",
    },
  ],

  "Cloud Engineer": [
    {
      skill: "Linux",
      question: "How comfortable are you with Linux systems?",
    },
    {
      skill: "Networking",
      question: "How comfortable are you with networking concepts?",
    },
    {
      skill: "AWS / Azure / GCP",
      question:
        "How comfortable are you with cloud platforms such as AWS, Azure or GCP?",
    },
    {
      skill: "Docker",
      question: "How comfortable are you with Docker and containers?",
    },
    {
      skill: "Kubernetes",
      question:
        "How comfortable are you with Kubernetes and container orchestration?",
    },
    {
      skill: "Cloud Security",
      question: "How comfortable are you with cloud security concepts?",
    },
    {
      skill: "CI/CD",
      question: "How comfortable are you with CI/CD pipelines?",
    },
    {
      skill: "Infrastructure",
      question:
        "How comfortable are you with cloud infrastructure and deployment?",
    },
  ],
};

const levels = [
  {
    label: "Beginner",
    value: 25,
    description: "I am just starting",
  },
  {
    label: "Basic",
    value: 50,
    description: "I know the fundamentals",
  },
  {
    label: "Intermediate",
    value: 75,
    description: "I can build projects",
  },
  {
    label: "Advanced",
    value: 100,
    description: "I am highly confident",
  },
];

function SkillAssessment() {
  const navigate = useNavigate();

  const storedCareer =
    localStorage.getItem("selectedCareer") || "Full Stack Developer";

  const careerAliases = {
    "AI/ML Engineer": "AI / ML Engineer",
    "AI ML Engineer": "AI / ML Engineer",
    "AI-ML Engineer": "AI / ML Engineer",

    "Full Stack Developer": "Full Stack Developer",

    "Cybersecurity Engineer": "Cybersecurity Engineer",

    "Data Scientist": "Data Scientist",

    "Backend Developer": "Backend Developer",

    "Cloud Engineer": "Cloud Engineer",
  };

  const selectedCareer = careerAliases[storedCareer] || storedCareer;

  const questions =
    careerQuestions[selectedCareer] || careerQuestions["Full Stack Developer"];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.skill];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.skill]: value,
    }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleSubmit = () => {
    if (!currentAnswer) return;

    const finalAnswers = {
      ...answers,
      [question.skill]: currentAnswer,
    };

    localStorage.setItem("assessmentResults", JSON.stringify(finalAnswers));

    localStorage.setItem("assessmentCareer", selectedCareer);

    // Keep the career available for Results and Roadmap
    localStorage.setItem("selectedCareer", selectedCareer);

    navigate("/results");
  };

  return (
    <div className="py-8">
      <button
        onClick={() => navigate("/careers")}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Careers
      </button>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Brain size={17} />
            Skill Assessment
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Discover Your Skill Level
          </h1>

          <p className="text-slate-600 mt-3">
            Assessment for{" "}
            <span className="font-semibold text-primary-600">
              {selectedCareer}
            </span>
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span className="text-sm font-semibold text-primary-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-primary-600 mb-2">
              {question.skill}
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              {question.question}
            </h2>

            <p className="text-slate-500 mt-2">
              Select the option that best describes your current ability.
            </p>
          </div>

          {/* Levels */}
          <div className="space-y-3">
            {levels.map((level) => {
              const isSelected = currentAnswer === level.value;

              return (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => handleAnswer(level.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-primary-600 bg-indigo-50"
                      : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-primary-600" : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-primary-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">
                        {level.label}
                      </p>

                      <p className="text-sm text-slate-500">
                        {level.description}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-slate-400">
                      {level.value}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-5 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!currentAnswer}
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Finish Assessment
                <CheckCircle2 size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Question indicators */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {questions.map((item, index) => (
            <div
              key={item.skill}
              className={`w-3 h-3 rounded-full ${
                answers[item.skill]
                  ? "bg-green-500"
                  : index === currentQuestion
                    ? "bg-primary-600"
                    : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillAssessment;
