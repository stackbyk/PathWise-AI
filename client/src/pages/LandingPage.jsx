import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, Brain, Map, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center text-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-12"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4 border border-primary-200 dark:border-primary-800">
            Your AI-powered interactive guide to the right career path.
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Navigate Your Tech Career with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
              PathWise AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            An AI-Powered Interactive Roadmap Builder that identifies your skill
            gaps and generates a personalized learning path using graph
            algorithms.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/30 flex items-center gap-2"
          >
            Build My Roadmap <ArrowRight size={20} />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 rounded-xl glass text-slate-700 dark:text-slate-300 font-semibold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Login
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 text-left"
        >
          <div className="glass p-6 rounded-2xl">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Compass size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Skill Gap Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Assess your current skills against career requirements to find
              exactly what you need to learn.
            </p>
          </div>

          <div className="glass p-6 rounded-2xl border-primary-200 dark:border-primary-800 shadow-xl shadow-primary-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Map size={100} />
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 relative z-10">
              <Map size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 relative z-10">
              Graph-Based Roadmap
            </h3>
            <p className="text-slate-600 dark:text-slate-400 relative z-10">
              Generates a topologically sorted DAG (Directed Acyclic Graph) of
              prerequisites for a valid learning sequence.
            </p>
          </div>

          <div className="glass p-6 rounded-2xl">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
              <Brain size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Recommendations</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Uses TF-IDF vectorization and Cosine Similarity to recommend the
              best resources for you.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
