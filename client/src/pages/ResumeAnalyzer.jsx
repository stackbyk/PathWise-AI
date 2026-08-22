// src/pages/ResumeAnalyzer.jsx

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Code2,
  Download,
  GraduationCap,
  Lightbulb,
  Loader2,
  FileText,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   API
========================================================= */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =========================================================
   HELPERS
========================================================= */

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
};

const getScoreLabel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Needs Attention";
};

const getScoreColorClass = (score) => {
  if (score >= 80) {
    return {
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
    };
  }

  if (score >= 65) {
    return {
      text: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
    };
  }

  if (score >= 50) {
    return {
      text: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
    };
  }

  return {
    text: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
  };
};

const getImportanceClass = (importance) => {
  switch (importance?.toLowerCase()) {
    case "high":
      return "bg-red-500/10 text-red-400 border-red-500/20";

    case "medium":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";

    case "low":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";

    default:
      return "bg-white/5 text-gray-300 border-white/10";
  }
};

/* =========================================================
   SCORE CIRCLE
========================================================= */

function ScoreCircle({ score, label, icon: Icon }) {
  const safeScore = Number(score) || 0;
  const colors = getScoreColorClass(safeScore);

  return (
    <div
      className={`relative rounded-2xl border ${colors.border} ${colors.bg} p-6`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{label}</p>

          <div className="mt-3 flex items-end gap-2">
            <span className={`text-4xl font-bold ${colors.text}`}>
              {safeScore}
            </span>

            <span className="mb-1 text-sm text-gray-500">/100</span>
          </div>

          <p className={`mt-2 text-sm font-medium ${colors.text}`}>
            {getScoreLabel(safeScore)}
          </p>
        </div>

        <div className={`rounded-xl border ${colors.border} p-3 ${colors.bg}`}>
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            safeScore >= 80
              ? "bg-emerald-400"
              : safeScore >= 65
                ? "bg-cyan-400"
                : safeScore >= 50
                  ? "bg-amber-400"
                  : "bg-red-400"
          }`}
          style={{ width: `${safeScore}%` }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SECTION CARD
========================================================= */

function SectionCard({
  title,
  subtitle,
  icon: Icon,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-xl shadow-black/10 backdrop-blur-sm ${className}`}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>

          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      {children}
    </section>
  );
}

/* =========================================================
   EMPTY MESSAGE
========================================================= */

function EmptyMessage({ children }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-center text-sm text-gray-500">
      {children}
    </div>
  );
}

/* =========================================================
   RESUME ANALYZER
========================================================= */

export default function ResumeAnalyzer() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [resumeInfo, setResumeInfo] = useState(null);
  const [career, setCareer] = useState("");

  const [error, setError] = useState("");

  const [expandedSections, setExpandedSections] = useState({
    detectedSkills: true,
    missingSkills: true,
    strengths: true,
    weaknesses: true,
    projects: true,
    recommendations: true,
  });

  /* =======================================================
     FILE VALIDATION
  ======================================================= */

  const validateFile = (file) => {
    if (!file) {
      return "Please select a PDF resume.";
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return "Only PDF resume files are supported.";
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      return "The PDF must be smaller than 10 MB.";
    }

    return "";
  };

  /* =======================================================
     SELECT FILE
  ======================================================= */

  const handleFileSelect = (file) => {
    setError("");
    setAnalysis(null);
    setResumeInfo(null);

    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setError(validationError);
      return;
    }

    setSelectedFile(file);
  };

  /* =======================================================
     FILE INPUT
  ======================================================= */

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFileSelect(file);
    }

    event.target.value = "";
  };

  /* =======================================================
     DRAG EVENTS
  ======================================================= */

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFileSelect(file);
    }
  };

  /* =======================================================
     REMOVE FILE
  ======================================================= */

  const removeFile = () => {
    setSelectedFile(null);
    setAnalysis(null);
    setResumeInfo(null);
    setError("");
  };

  /* =======================================================
     ANALYZE RESUME
  ======================================================= */

  const analyzeResume = async () => {
    setError("");

    if (!selectedFile) {
      setError("Please upload your resume first.");
      return;
    }

    const token = localStorage.getItem("pathwiseToken");

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    try {
      setAnalyzing(true);

      const formData = new FormData();

      formData.append("resume", selectedFile);

      const response = await fetch(`${API_BASE_URL}/api/resume/analyze`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response. Please try again.",
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message || "Unable to analyze the resume. Please try again.",
        );
      }

      setCareer(data.career || "Selected Career");

      setResumeInfo(data.resume || null);

      setAnalysis(data.analysis || null);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Resume analysis error:", err);

      setError(
        err?.message || "Something went wrong while analyzing your resume.",
      );
    } finally {
      setAnalyzing(false);
    }
  };

  /* =======================================================
     TOGGLE SECTION
  ======================================================= */

  const toggleSection = (section) => {
    setExpandedSections((previous) => ({
      ...previous,
      [section]: !previous[section],
    }));
  };

  /* =======================================================
     START NEW ANALYSIS
  ======================================================= */

  const startNewAnalysis = () => {
    setSelectedFile(null);
    setAnalysis(null);
    setResumeInfo(null);
    setCareer("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     AUTH LOADING
  ======================================================= */

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-cyan-400" />

            <p className="mt-4 text-sm text-gray-400">
              Loading your account...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400">
                <Sparkles className="h-3.5 w-3.5" />
                AI Career Intelligence
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Resume Analyzer
              </h1>

              <p className="mt-3 max-w-2xl text-gray-400">
                Upload your resume and let PathWise AI evaluate its ATS
                compatibility, career alignment, skills, projects, and
                improvement opportunities.
              </p>
            </div>

            {user?.name && (
              <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-right sm:block">
                <p className="text-xs text-gray-500">Analyzing for</p>

                <p className="mt-1 text-sm font-medium text-gray-200">
                  {user.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <CircleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />

            <div className="flex-1">
              <p className="text-sm font-medium text-red-300">
                Unable to analyze resume
              </p>

              <p className="mt-1 text-sm text-red-400/80">{error}</p>
            </div>

            <button
              onClick={() => setError("")}
              className="rounded-lg p-1 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* =================================================
            UPLOAD SECTION
        ================================================= */}

        {!analysis && (
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1422]/90 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                  <FileText className="h-6 w-6 text-cyan-400" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Upload your resume
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Upload a PDF resume to begin your AI-powered analysis.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* ===========================================
                  DROPZONE
              =========================================== */}

              {!selectedFile ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`group flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                    isDragging
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-cyan-500/[0.03]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleInputChange}
                    className="hidden"
                  />

                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5 transition group-hover:scale-105">
                    <Upload className="h-8 w-8 text-cyan-400" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {isDragging
                      ? "Drop your resume here"
                      : "Drag & drop your PDF here"}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    or click anywhere to browse your files
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-500">
                      PDF only
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-500">
                      Maximum 10 MB
                    </span>
                  </div>
                </button>
              ) : (
                /* =========================================
                   SELECTED FILE
                ========================================= */

                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                        <FileText className="h-7 w-7 text-red-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">
                          {selectedFile.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {formatFileSize(selectedFile.size)} · PDF
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      disabled={analyzing}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                    <span className="text-sm text-emerald-300">
                      PDF is ready for analysis
                    </span>
                  </div>
                </div>
              )}

              {/* =========================================
                  ANALYZE BUTTON
              ========================================= */}

              {selectedFile && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-gray-600">
                    Your resume is securely processed for this analysis.
                  </p>

                  <button
                    type="button"
                    onClick={analyzeResume}
                    disabled={analyzing}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Analyze Resume
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* =========================================
                  LOADING STATE
              ========================================= */}

              {analyzing && (
                <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                      <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
                    </div>

                    <div>
                      <p className="font-medium text-white">
                        AI is analyzing your resume
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Extracting skills, evaluating ATS compatibility, and
                        matching your career path...
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-400" />
                  </div>
                </div>
              )}

              {/* =========================================
                  WHAT WE ANALYZE
              ========================================= */}

              {!analyzing && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      icon: Target,
                      title: "ATS Score",
                      text: "Check ATS compatibility",
                    },
                    {
                      icon: Code2,
                      title: "Skills",
                      text: "Identify skills & gaps",
                    },
                    {
                      icon: BriefcaseBusiness,
                      title: "Career Match",
                      text: "Measure career alignment",
                    },
                    {
                      icon: Lightbulb,
                      title: "AI Feedback",
                      text: "Get actionable improvements",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                      >
                        <Icon className="h-5 w-5 text-cyan-400" />

                        <p className="mt-3 text-sm font-medium text-gray-200">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-600">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* =================================================
            RESULTS
        ================================================= */}

        {analysis && (
          <div className="space-y-6">
            {/* =============================================
                RESULT HEADER
            ============================================= */}

            <section className="rounded-3xl border border-white/10 bg-[#0d1422]/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                    <FileText className="h-7 w-7 text-red-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                      Resume Analysis Complete
                    </p>

                    <h2 className="mt-1 truncate text-xl font-semibold text-white">
                      {resumeInfo?.fileName || "Resume"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {career}
                      {resumeInfo?.pageCount
                        ? ` · ${resumeInfo.pageCount} page${
                            resumeInfo.pageCount === 1 ? "" : "s"
                          }`
                        : ""}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startNewAnalysis}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <Upload className="h-4 w-4" />
                  Analyze Another Resume
                </button>
              </div>
            </section>

            {/* =============================================
                SCORE CARDS
            ============================================= */}

            <div className="grid gap-4 md:grid-cols-3">
              <ScoreCircle
                score={analysis.resumeScore}
                label="Resume Score"
                icon={Award}
              />

              <ScoreCircle
                score={analysis.atsScore}
                label="ATS Score"
                icon={TrendingUp}
              />

              <ScoreCircle
                score={analysis.careerMatchScore}
                label="Career Match"
                icon={Target}
              />
            </div>

            {/* =============================================
                SUMMARY
            ============================================= */}

            <SectionCard
              title="AI Resume Summary"
              subtitle={`Overall evaluation for ${career}`}
              icon={Sparkles}
            >
              <div className="rounded-xl border border-cyan-500/10 bg-cyan-500/[0.03] p-5">
                <p className="leading-7 text-gray-300">
                  {analysis.summary ||
                    "No summary was provided by the AI analyzer."}
                </p>
              </div>
            </SectionCard>

            {/* =============================================
                DETECTED + MISSING SKILLS
            ============================================= */}

            <div className="grid gap-6 lg:grid-cols-2">
              <SectionCard
                title="Detected Skills"
                subtitle="Skills identified from your resume"
                icon={Code2}
              >
                {analysis.detectedSkills?.length ? (
                  <div className="space-y-3">
                    {analysis.detectedSkills.map((skill, index) => (
                      <div
                        key={`${skill.name}-${index}`}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-white">
                              {skill.name || "Unnamed Skill"}
                            </h3>

                            {skill.category && (
                              <span className="mt-1 inline-block text-xs text-cyan-400">
                                {skill.category}
                              </span>
                            )}
                          </div>

                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        </div>

                        {skill.evidence && (
                          <p className="mt-3 text-sm leading-6 text-gray-500">
                            {skill.evidence}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyMessage>
                    No specific skills were detected from the resume.
                  </EmptyMessage>
                )}
              </SectionCard>

              <SectionCard
                title="Missing Skills"
                subtitle="Skills that could strengthen your career alignment"
                icon={CircleAlert}
              >
                {analysis.missingSkills?.length ? (
                  <div className="space-y-3">
                    {analysis.missingSkills.map((skill, index) => (
                      <div
                        key={`${skill.name}-${index}`}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h3 className="font-medium text-white">
                            {skill.name || "Unnamed Skill"}
                          </h3>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getImportanceClass(
                              skill.importance,
                            )}`}
                          >
                            {skill.importance || "Normal"}
                          </span>
                        </div>

                        {skill.reason && (
                          <p className="mt-3 text-sm leading-6 text-gray-500">
                            {skill.reason}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyMessage>
                    Great! No major missing skills were identified.
                  </EmptyMessage>
                )}
              </SectionCard>
            </div>

            {/* =============================================
                STRENGTHS + WEAKNESSES
            ============================================= */}

            <div className="grid gap-6 lg:grid-cols-2">
              <SectionCard
                title="Strengths"
                subtitle="What your resume is doing well"
                icon={CheckCircle2}
              >
                {analysis.strengths?.length ? (
                  <div className="space-y-3">
                    {analysis.strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />

                        <p className="text-sm leading-6 text-gray-300">
                          {strength}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyMessage>
                    No specific strengths were identified.
                  </EmptyMessage>
                )}
              </SectionCard>

              <SectionCard
                title="Weaknesses"
                subtitle="Areas that may reduce resume effectiveness"
                icon={CircleAlert}
              >
                {analysis.weaknesses?.length ? (
                  <div className="space-y-3">
                    {analysis.weaknesses.map((weakness, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-4"
                      >
                        <CircleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" />

                        <p className="text-sm leading-6 text-gray-300">
                          {weakness}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyMessage>
                    No major weaknesses were identified.
                  </EmptyMessage>
                )}
              </SectionCard>
            </div>

            {/* =============================================
                PROJECTS
            ============================================= */}

            <SectionCard
              title="Project Analysis"
              subtitle="How effectively your projects demonstrate your capabilities"
              icon={Code2}
            >
              {analysis.projects?.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {analysis.projects.map((project, index) => {
                    const projectScore = project.quality;

                    return (
                      <div
                        key={`${project.name}-${index}`}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-white">
                            {project.name || "Unnamed Project"}
                          </h3>

                          <span className="flex-shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400">
                            {projectScore || "Reviewed"}
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-gray-400">
                          {project.feedback ||
                            "No additional feedback was provided."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <EmptyMessage>
                  No projects were detected in the resume.
                </EmptyMessage>
              )}
            </SectionCard>

            {/* =============================================
                EXPERIENCE / EDUCATION / FORMATTING
            ============================================= */}

            <div className="grid gap-6 md:grid-cols-3">
              <SectionCard title="Experience" icon={BriefcaseBusiness}>
                <div className="text-center">
                  <div
                    className={`text-4xl font-bold ${
                      getScoreColorClass(analysis.experience?.score).text
                    }`}
                  >
                    {analysis.experience?.score ?? 0}
                  </div>

                  <p className="mt-1 text-xs text-gray-600">out of 100</p>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${analysis.experience?.score || 0}%`,
                    }}
                  />
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-400">
                  {analysis.experience?.feedback ||
                    "No experience feedback was provided."}
                </p>
              </SectionCard>

              <SectionCard title="Education" icon={GraduationCap}>
                <div className="text-center">
                  <div
                    className={`text-4xl font-bold ${
                      getScoreColorClass(analysis.education?.score).text
                    }`}
                  >
                    {analysis.education?.score ?? 0}
                  </div>

                  <p className="mt-1 text-xs text-gray-600">out of 100</p>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${analysis.education?.score || 0}%`,
                    }}
                  />
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-400">
                  {analysis.education?.feedback ||
                    "No education feedback was provided."}
                </p>
              </SectionCard>

              <SectionCard title="Formatting" icon={FileText}>
                <div className="text-center">
                  <div
                    className={`text-4xl font-bold ${
                      getScoreColorClass(analysis.formatting?.score).text
                    }`}
                  >
                    {analysis.formatting?.score ?? 0}
                  </div>

                  <p className="mt-1 text-xs text-gray-600">out of 100</p>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${analysis.formatting?.score || 0}%`,
                    }}
                  />
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-400">
                  {analysis.formatting?.feedback ||
                    "No formatting feedback was provided."}
                </p>
              </SectionCard>
            </div>

            {/* =============================================
                AI SUGGESTIONS
            ============================================= */}

            <SectionCard
              title="AI Recommendations"
              subtitle="Practical changes you can make to improve your resume"
              icon={Lightbulb}
            >
              {analysis.suggestions?.length ? (
                <div className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-cyan-500/10 bg-cyan-500/[0.03] p-4"
                    >
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-xs font-bold text-cyan-400">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-6 text-gray-300">
                        {suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyMessage>
                  No additional suggestions were provided.
                </EmptyMessage>
              )}
            </SectionCard>

            {/* =============================================
                RECOMMENDED ACTIONS
            ============================================= */}

            <SectionCard
              title="Recommended Next Actions"
              subtitle="Use these steps to move your resume and career forward"
              icon={Zap}
            >
              {analysis.recommendedActions?.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {analysis.recommendedActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 text-xs font-bold text-cyan-400">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-6 text-gray-300">
                        {action}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyMessage>
                  No specific next actions were provided.
                </EmptyMessage>
              )}
            </SectionCard>

            {/* =============================================
                SKILL GAP CTA
            ============================================= */}

            <section className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.08] via-[#0d1422] to-purple-500/[0.06] p-6 shadow-2xl shadow-cyan-500/5 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400">
                    <Target className="h-3.5 w-3.5" />
                    Close Your Skill Gaps
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    Turn your resume insights into a learning plan
                  </h2>

                  <p className="mt-3 leading-6 text-gray-400">
                    Use your missing skills and career alignment results to
                    identify what you should learn next on your PathWise
                    roadmap.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/skill-gap-analysis")}
                  className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
                >
                  Open Skill Gap Analysis
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>

            {/* =============================================
                BOTTOM ACTIONS
            ============================================= */}

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={startNewAnalysis}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Upload className="h-4 w-4" />
                Analyze Another Resume
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
