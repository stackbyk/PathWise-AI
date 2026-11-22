import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Target, Flame, Zap, Award, BookOpen, Check, Code2, Sparkles, Route, Trophy, LockKeyhole, Plus, CheckCircle2 } from "lucide-react";

function SectionHeading({ eyebrow, title, action }) {
  return <div className="pw-section-heading"><div>{eyebrow && <p className="pw-eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{action}</div>;
}

function ProgressBar({ value, label }) {
  const percent = Math.min(100, Math.max(0, Number(value) || 0));
  return <div className="pw-progress" role="progressbar" aria-label={label} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${percent}%` }} /></div>;
}

function StatCard({ icon: Icon, label, value, detail, children }) {
  return <article className="pw-stat"><div className="pw-stat-label"><Icon size={17} /><span>{label}</span></div><div className="pw-stat-value">{value}</div><p>{detail}</p>{children}</article>;
}

function QuoteCard({ icon: Icon, label, quote }) {
  return <article className="pw-quote"><p className="pw-eyebrow"><Icon size={15} />{label}</p><blockquote>“{quote.quote}”</blockquote><p className="pw-muted">{quote.subtext}</p></article>;
}

function CareerCard({ career, progress, completedSkills }) {
  return <section className="pw-career-card">
    <div className="pw-career-top"><span className="pw-chip"><Target size={14} />YOUR NORTH STAR</span><span className="pw-small">Built around your ambitions</span></div>
    <div className="pw-career-main"><div><p className="pw-career-label">Your target career</p><h2>{career}</h2><p>A little learning today. A world of possibilities tomorrow.</p></div><div className="pw-path-art" aria-hidden="true"><Route size={72} strokeWidth={1} /><span><Compass size={23} /></span></div></div>
    <div className="pw-career-bottom"><div className="pw-career-progress"><div><span>Your roadmap progress</span><strong>{progress}%</strong></div><ProgressBar value={progress} label="Career roadmap progress" /><p>{completedSkills} skills completed · Every step counts</p></div><Link to="/roadmap" className="pw-button pw-button-dark">{progress > 0 ? "Continue roadmap" : "Start my roadmap"}</Link></div>
  </section>;
}

function LearningCard({ skills }) {
  const nextSkills = skills.filter(skill => !skill.completed).slice(0, 3);
  return <section className="pw-panel pw-learning">
    <SectionHeading eyebrow="MAKE YOUR NEXT MOVE" title="A little closer, every day." action={<Link className="pw-text-link" to="/roadmap">View roadmap</Link>} />
    <p className="pw-muted">Pick up where you left off, or discover something new.</p>
    {nextSkills.length ? <div className="pw-skill-list">{nextSkills.map((skill, index) => <Link className="pw-skill" to="/roadmap" key={`${skill.name}-${index}`}><span className="pw-tile-icon"><BookOpen size={22} /></span><div><h3>{skill.name}</h3><p>{skill.progress}% complete</p><ProgressBar value={skill.progress} label={`${skill.name} progress`} /></div><span className="pw-small">Continue</span></Link>)}</div> : <div className="pw-start-learning"><span className="pw-tile-icon"><BookOpen size={25} /></span><div><h3>Your next chapter starts here.</h3><p>Add your skills to get a clearer picture of where to go next.</p><Link to="/profile" className="pw-text-link"><Plus size={15} />Add your skills</Link></div></div>}
    <div className="pw-assessment-note"><BrainIcon /><p>Not sure where to start? <Link to="/skill-assessment">Discover your strengths</Link> with a skill assessment.</p></div>
  </section>;
}
function BrainIcon() { return <Sparkles size={19} className="pw-no-shrink" />; }

function FocusCard({ completedSkills, progress, streak }) {
  const goals = [
    { label:"Find a career that inspires you", done:progress > 0, to:"/career-exploration" },
    { label:"Build one new skill", done:completedSkills > 0, to:"/roadmap" },
    { label:"Keep your learning streak alive", done:streak > 1, to:"/roadmap" },
  ];
  return <section className="pw-panel pw-focus"><div className="pw-focus-title"><span className="pw-tile-icon"><Target size={21} /></span><span className="pw-small">ONE STEP AT A TIME</span></div><h2>A little focus.<br />A lot of possibility.</h2><p className="pw-muted">Big futures are built with small, consistent actions.</p><div className="pw-goals">{goals.map(goal => <Link to={goal.to} key={goal.label}><span className={`pw-goal-check ${goal.done ? "is-done" : ""}`}>{goal.done && <Check size={13} />}</span><span>{goal.label}</span></Link>)}</div><div className="pw-focus-footer"><Sparkles size={15} /><span>You've got this. Keep moving forward.</span></div></section>;
}

function BadgesCard({ badges, unlockedBadges }) {
  return <section className="pw-panel pw-badges" id="badges"><SectionHeading title="Small wins. Big energy." action={<span className="pw-count">{unlockedBadges}/{badges.length}</span>} /><p className="pw-muted">A reminder of how far you've come.</p><div className="pw-badge-grid">{badges.slice(0, 3).map((badge, i) => <div className={badge.unlocked ? "pw-badge unlocked" : "pw-badge"} key={badge.id}><span>{badge.unlocked ? <Award size={27} /> : <LockKeyhole size={23} />}</span><h3>{badge.name}</h3><p>{badge.unlocked ? "Unlocked" : `${[1, 5, 10][i]} ${i === 0 ? "skill" : "skills"}`}</p></div>)}</div><Link to="/arena" className="pw-text-link">Explore all achievements</Link></section>;
}

function QuickLinks() {
  const actions = [{ icon:Compass, title:"Explore careers", text:"Find a path that feels like you.", to:"/career-exploration" }, { icon:Sparkles, title:"Made for your next chapter", text:"Explore your recommendations.", to:"/recommendations" }];
  return <div className="pw-quick-links">{actions.map(({ icon:Icon, title, text, to }) => <Link key={to} className="pw-quick-link" to={to}><span className="pw-tile-icon"><Icon size={23} /></span><div><h3>{title}</h3><p>{text}</p></div></Link>)}</div>;
}

function CommunityCard({ leaderboard }) {
  return <section className="pw-panel pw-community"><div className="pw-community-heading"><Trophy size={20} /><h2>Grow together.</h2></div><p className="pw-muted">A little inspiration from your learning circle.</p><div className="pw-ranking">{leaderboard.map((person, index) => <div key={person.rank}><span className="pw-rank">{index + 1}</span><span className="pw-mini-avatar">{person.name.charAt(0).toUpperCase()}</span><span>{person.currentUser ? "You" : person.name}{person.currentUser && <small>YOUR JOURNEY</small>}</span><strong>{person.xp} XP</strong></div>)}</div><p className="pw-demo-note">Illustrative community rankings</p><Link to="/arena" className="pw-text-link">Visit the arena</Link></section>;
}

export default function DashboardContent({ name, career, xp, level, levelName, levelProgress, remainingXP, streak, completedSkills, progress, skills, badges, leaderboard, unlockedBadges, dailyQuotes }) {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#badges") document.getElementById("badges")?.scrollIntoView({ behavior:"smooth", block:"center" });
  }, [location]);
  return <main className="pw-main">
    <header className="pw-welcome"><div><p className="pw-eyebrow"><span className="pw-tiny-line" />YOUR SPACE TO GROW</p><h1>Welcome back, <em>{name === "there" ? "learner" : name}.</em></h1><p>Your next chapter is yours to create. Let's make a little progress today.</p></div><Link to="/dashboard#badges" className="pw-journey-label"><span><CheckCircle2 size={18} /></span>Every step is a step forward</Link></header>
    <div className="pw-dashboard-grid"><div className="pw-primary-column">
      <CareerCard career={career} progress={progress} completedSkills={completedSkills} />
      <section className="pw-stats" aria-label="Your learning statistics">
        <StatCard icon={Zap} label="TOTAL EXPERIENCE" value={<>{xp}<small>XP</small></>} detail="Learning that adds up." />
        <StatCard icon={Award} label="YOUR LEVEL" value={<>{String(level).padStart(2,"0")}<small>{levelName}</small></>} detail={`${remainingXP} XP to your next level`}><ProgressBar value={levelProgress} label="Progress to next level" /></StatCard>
        <StatCard icon={Flame} label="LEARNING STREAK" value={<>{streak}<small>{streak === 1 ? "day" : "days"}</small></>} detail="Show up for your future self." />
      </section>
      <LearningCard skills={skills} />
      <QuickLinks />
      <section className="pw-quotes" aria-label="Daily inspiration"><QuoteCard icon={Code2} label="DEVELOPER WISDOM" quote={dailyQuotes.developer} /><QuoteCard icon={Sparkles} label="A DAILY DOSE OF POSSIBILITY" quote={dailyQuotes.motivation} /></section>
    </div><aside className="pw-secondary-column" aria-label="Your motivation and achievements"><FocusCard completedSkills={completedSkills} progress={progress} streak={streak} /><BadgesCard badges={badges} unlockedBadges={unlockedBadges} /><CommunityCard leaderboard={leaderboard} /></aside></div>
    <footer className="pw-footer"><Link to="/dashboard"><Compass size={17} />PathWise AI</Link><p>A clearer path. A brighter future.</p><span>Built for your becoming.</span></footer>
  </main>;
}
