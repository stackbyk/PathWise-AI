import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Code2, ShieldCheck, BrainCircuit, ChartNoAxesCombined, Server, Cloud, Compass, ListChecks, Route, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import "./CareerExploration.css";

const careers = [
  { title: "Full Stack Developer", description: "Build complete web applications using frontend and backend technologies.", icon: Code2, category: "Development", skills: ["Frontend", "Backend", "Web applications"] },
  { title: "Cybersecurity Engineer", description: "Protect systems, networks and applications from cyber threats.", icon: ShieldCheck, category: "Security & Cloud", skills: ["Networks", "Security", "Threat analysis"] },
  { title: "AI / ML Engineer", description: "Build intelligent systems using machine learning and artificial intelligence.", icon: BrainCircuit, category: "Data & AI", skills: ["Machine learning", "Python", "AI systems"] },
  { title: "Data Scientist", description: "Analyze data and build models to solve real-world problems.", icon: ChartNoAxesCombined, category: "Data & AI", skills: ["Analytics", "Statistics", "Data modeling"] },
  { title: "Backend Developer", description: "Build APIs, databases and server-side applications.", icon: Server, category: "Development", skills: ["APIs", "Databases", "Server-side logic"] },
  { title: "Cloud Engineer", description: "Design, deploy and manage applications using cloud infrastructure.", icon: Cloud, category: "Security & Cloud", skills: ["Infrastructure", "Deployment", "Cloud platforms"] },
];
const categories = ["All careers", "Development", "Data & AI", "Security & Cloud"];
const steps = [
  { icon: Compass, title: "Choose a career.", description: "Follow your curiosity. Find a role that matches what you love to do." },
  { icon: ListChecks, title: "Take a skill assessment.", description: "Discover your strengths and see where you have room to grow." },
  { icon: Route, title: "Get your personalized roadmap.", description: "Turn your goals into a clear learning path, one skill at a time." },
];

function CareerCard({ career, onSelect }) {
  const Icon = career.icon;
  return <article className="ce-card">
    <div className="ce-card-top"><span className="ce-icon"><Icon size={26} strokeWidth={1.6} /></span><span className="ce-category">{career.category}</span></div>
    <h3>{career.title}</h3>
    <p className="ce-description">{career.description}</p>
    <ul className="ce-skills" aria-label={`${career.title} focus areas`}>{career.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
    <div className="ce-card-actions"><p><Compass size={14} />Explore your fit. Build your future.</p><button type="button" className="ce-button ce-button-primary" onClick={() => onSelect(career.title, "/skill-assessment")}>Take Skill Assessment</button><button type="button" className="ce-button ce-button-secondary" onClick={() => onSelect(career.title, "/roadmap")}>View Roadmap</button></div>
  </article>;
}

function HowItWorks() {
  return <section className="ce-how" aria-labelledby="ce-how-heading"><div className="ce-how-heading"><div><p className="ce-eyebrow">FROM CURIOSITY TO CLARITY</p><h2 id="ce-how-heading">Your next chapter, in three steps.</h2></div><p>You don't need to have it all figured out.<br />You just need a place to start.</p></div><ol className="ce-steps">{steps.map(({ icon: Icon, title, description }, index) => <li key={title}><div className="ce-step-heading"><span className="ce-step-icon"><Icon size={22} strokeWidth={1.6} /></span><span>STEP {index + 1}</span></div><h3>{title}</h3><p>{description}</p></li>)}</ol></section>;
}

export default function CareerExploration() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All careers");
  const search = query.trim().toLocaleLowerCase();
  const filteredCareers = careers.filter(career =>
    (category === "All careers" || career.category === category) &&
    `${career.title} ${career.description} ${career.skills.join(" ")}`.toLocaleLowerCase().includes(search),
  );

  const handleSelection = (career, destination) => {
    localStorage.setItem("selectedCareer", career);
    localStorage.setItem("assessmentCareer", career);
    localStorage.setItem("selectedCareerUpdatedAt", new Date().toISOString());
    navigate(destination);
  };
  const clearFilters = () => { setQuery(""); setCategory("All careers"); };

  return <div className="career-explorer"><Navbar /><main className="ce-main">
    <div className="ce-breadcrumb"><Link to="/dashboard">Dashboard</Link><span aria-hidden="true">/</span><span aria-current="page">Career exploration</span></div>
    <header className="ce-hero"><div className="ce-hero-copy"><p className="ce-eyebrow"><span />A WORLD OF POSSIBILITY</p><h1>Find your path.</h1><p className="ce-hero-subtitle">Explore careers that spark your curiosity, discover your strengths, and find a learning path that moves you forward.</p><div className="ce-search"><Search size={21} aria-hidden="true" /><label className="ce-sr-only" htmlFor="ce-career-search">Search careers, skills or roles</label><input id="ce-career-search" type="search" placeholder="Search careers, skills or roles..." value={query} onChange={event => setQuery(event.target.value)} />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear career search"><X size={18} /></button>}</div></div><div className="ce-hero-aside"><span className="ce-compass"><Compass size={62} strokeWidth={1} /></span><div><p>A direction.<br /><em>Not a destination.</em></p><span>Your career can grow with you.</span></div></div></header>
    <section className="ce-careers" aria-labelledby="ce-careers-heading"><div className="ce-section-heading"><div><p className="ce-eyebrow">EXPLORE WHAT'S NEXT</p><h2 id="ce-careers-heading">Six paths. Endless potential.</h2></div><span className="ce-section-note"><Check size={15} />Your pace. Your possibilities.</span></div><div className="ce-filter-row"><div className="ce-filters" role="group" aria-label="Filter careers by category">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><p className="ce-result-count" role="status" aria-live="polite" aria-atomic="true">{filteredCareers.length} {filteredCareers.length === 1 ? "career" : "careers"}{search || category !== "All careers" ? " found" : " to explore"}</p></div>
    {filteredCareers.length ? <div className="ce-grid">{filteredCareers.map(career => <CareerCard key={career.title} career={career} onSelect={handleSelection} />)}</div> : <div className="ce-empty"><span className="ce-icon"><Search size={26} /></span><h3>No careers found.</h3><p>Try a different role or skill, or explore all six career paths.</p><button type="button" className="ce-button ce-button-primary" onClick={clearFilters}>Clear filters</button></div>}
    </section><HowItWorks /><footer className="ce-footer"><Link to="/dashboard"><Compass size={18} />PathWise AI</Link><p>A clearer path. A brighter future.</p><span>Built for your becoming.</span></footer>
  </main></div>;
}
