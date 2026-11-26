// @ts-check
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Route, Target, Trophy, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { rankRecommendations } from '../data/learning/recommendationModel';
import { SkillRecommendationCard } from '../components/recommendations/SkillRecommendationCard';
import './Recommendations.css';

/** @typedef {{uid?:string,_id?:string,id?:string,email?:string}} LearningUser */
function readAssessment() {
 const career=localStorage.getItem('selectedCareer')||localStorage.getItem('assessmentCareer')||'Full Stack Developer';
 try {return {career,results:JSON.parse(localStorage.getItem('assessmentResults')||'{}')};}
 catch {return {career,results:{}};}
}
function RecommendationSkeleton() {
 return <div className="rec-loading" role="status" aria-label="Loading learning recommendations"><span className="rec-sr-only">Loading your learning plan…</span>{[1,2,3].map(number=><div className="rec-skeleton-card" key={number} aria-hidden="true"><span/><span/><span/></div>)}</div>;
}

export default function Recommendations() {
 const navigate=useNavigate();
 const {user,loading}=/** @type {{user:LearningUser|null,loading:boolean}} */ (/** @type {unknown} */ (useAuth()));
 const [assessment,setAssessment]=useState(readAssessment);
 useEffect(()=>{
  const refresh=()=>setAssessment(readAssessment());
  const handleStorage=/** @param {StorageEvent} event */ event=>{if(!event.key||['selectedCareer','assessmentCareer','assessmentResults','pathwiseAssessmentResults'].includes(event.key))refresh();};
  window.addEventListener('storage',handleStorage);window.addEventListener('pathwiseProfileUpdated',refresh);
  return()=>{window.removeEventListener('storage',handleStorage);window.removeEventListener('pathwiseProfileUpdated',refresh);};
 },[]);
 const recommendations=useMemo(()=>rankRecommendations(assessment.career,assessment.results),[assessment]);
 const weakSkills=recommendations.filter(item=>item.score<75);
 const strongSkills=recommendations.filter(item=>item.score>=75);
 const hasAssessment=recommendations.some(item=>item.assessed);
 const userId=user?.uid||user?._id||user?.id||user?.email||'guest';
 const openRoadmap=()=>navigate('/roadmap');

 return <div className="rec-page"><Navbar/><main className="rec-main"><div className="rec-breadcrumb"><Link to="/dashboard">Dashboard</Link><span aria-hidden="true">/</span><span aria-current="page">AI recommendations</span></div><header className="rec-hero"><div><p className="rec-eyebrow">PATHWISE AI · RECOMMENDATIONS</p><h1>Your personalized learning plan<em>{assessment.career}</em></h1><p>Built from your assessment results. Start with your lowest scores and level up one step at a time.</p></div><div className="rec-hero-art" aria-hidden="true"><Route size={76} strokeWidth={1}/><span><Compass size={24}/></span></div></header>
 {loading?<RecommendationSkeleton/>:!hasAssessment?<section className="rec-empty"><span className="rec-icon"><Target size={30}/></span><p className="rec-eyebrow">START WITH A LITTLE CLARITY</p><h2>Take the assessment to get recommendations</h2><p>Your learning plan starts with an honest snapshot of what you know. Complete your career assessment to see which skills to focus on next.</p><button type="button" className="rec-button rec-primary" onClick={()=>navigate('/skill-assessment')}>Take Skill Assessment</button></section>:<>
 <section className="rec-stats" aria-label="Your assessment summary"><article className="rec-stat rec-stat-improve"><div><span className="rec-icon"><Target size={21}/></span><p>Skills to improve</p></div><strong>{weakSkills.length}</strong><span>Small steps toward stronger foundations.</span></article><article className="rec-stat rec-stat-strong"><div><span className="rec-icon"><Trophy size={21}/></span><p>Strong skills</p></div><strong>{strongSkills.length}</strong><span>Knowledge you can keep building on.</span></article><article className="rec-stat rec-stat-career"><div><span className="rec-icon"><Compass size={21}/></span><p>Your chosen career</p></div><h2>{assessment.career}</h2><span><Sparkles size={14}/>You’ve got this. One step at a time.</span></article></section>
 <section className="rec-recommendations" aria-labelledby="rec-next-heading"><div className="rec-section-heading"><div><p className="rec-eyebrow">YOUR NEXT CHAPTER</p><h2 id="rec-next-heading">What you should learn next</h2><p>Ranked by your lowest assessment scores.</p></div><span className="rec-library-note"><BookOpen size={16}/>Free learning. Real possibilities.</span></div>{weakSkills.length===0&&<div className="rec-success" role="status"><CheckCircle2 size={22}/><div><strong>A strong foundation. Keep your momentum.</strong><p>You scored at least 75% across these skills. Explore projects and deeper practice below.</p></div></div>}<div className="rec-skill-list">{recommendations.map((item,index)=><SkillRecommendationCard key={`${userId}-${assessment.career}-${item.skill}`} item={item} index={index} userId={userId} onRoadmap={openRoadmap}/>)}</div></section>
 <section className="rec-continue"><div><p className="rec-eyebrow">ONE STEP AT A TIME</p><h2>Turn a little learning<br/>into lasting momentum.</h2><p>Your plan is a starting point. Make it yours, build something, and keep going.</p><span><Sparkles size={15}/>You’ve got this.</span></div><button type="button" className="rec-button rec-on-dark" onClick={openRoadmap}>Continue Roadmap</button></section>
 </>}<footer className="rec-footer"><Link to="/dashboard"><Compass size={17}/>PathWise AI</Link><p>A clearer path. A brighter future.</p><span>Built for your becoming.</span></footer></main></div>;
}
