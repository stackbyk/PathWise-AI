import { lazy, Suspense, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Server, BrainCircuit, ChartNoAxesCombined, ShieldCheck, Cloud, Compass, Clock3, ListChecks, Layers, Zap, Flag, CheckCircle2, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useProgress } from '../context/ProgressContext';
import { QUESTION_BANKS, readAssessmentCareer } from '../data/assessment';
import { initialQuizState, quizReducer, summarizeQuiz } from '../components/assessment/quizEngine';
import { saveQuizResults } from '../components/assessment/assessmentStorage';
import { ExitDialog, ProgressSidebar, QuizProgress, QuizQuestion, QuizScore } from '../components/assessment/QuizComponents';
const AssessmentResults = lazy(() => import('../components/assessment/AssessmentResults')); 
import './SkillAssessment.css';

const icons={code:Code2,server:Server,brain:BrainCircuit,chart:ChartNoAxesCombined,shield:ShieldCheck,cloud:Cloud};

function AssessmentIntro({ bank, onStart }) {
  const Icon=icons[bank.icon];
  const skills=[...new Set(bank.questions.map(q=>q.skill))];
  const maxXP=bank.questions.reduce((total,q)=>total+q.xp,0);
  return <div className="sa-intro"><header className="sa-intro-heading"><p className="sa-eyebrow">A LITTLE CURIOSITY. A CLEARER DIRECTION.</p><h1>Let's discover<br/>what you know.</h1><p>Find your strengths, uncover the gaps, and turn what you learn about yourself into a more focused learning journey.</p></header><section className="sa-intro-card"><div className="sa-intro-career"><span className="sa-career-icon"><Icon size={45} strokeWidth={1.4}/></span><div><p className="sa-eyebrow">YOUR CHOSEN PATH</p><h2>{bank.career}</h2><Link to="/career-exploration">Explore a different career</Link></div><span className="sa-quiz-label"><Sparkles size={15}/>KNOWLEDGE CHECK</span></div><div className="sa-intro-stats"><div><ListChecks size={20}/><strong>{bank.questions.length} questions</strong><span>Concepts, code & scenarios</span></div><div><Clock3 size={20}/><strong>15–20 minutes</strong><span>Untimed. Take your space.</span></div><div><Layers size={20}/><strong>{skills.length} skill areas</strong><span>A well-rounded snapshot</span></div><div><Zap size={20}/><strong>Up to {maxXP} XP</strong><span>Earn as you learn</span></div></div><div className="sa-intro-bottom"><div><h3>A thoughtful challenge, in four rounds.</h3><p>Beginner, intermediate and advanced questions appear throughout. Check each answer to see the reasoning, and skip anything you want to revisit.</p><div className="sa-difficulty-key"><span>Beginner</span><span>Intermediate</span><span>Advanced</span></div></div><button className="sa-button sa-primary" onClick={onStart}>Start Assessment</button></div></section><section className="sa-intro-areas"><p className="sa-eyebrow">WHAT YOU'LL EXPLORE</p><div>{skills.map(skill=><span key={skill}><CheckCircle2 size={15}/>{skill}</span>)}</div></section><p className="sa-motivation"><Compass size={18}/>You don't need to know everything. You just need a place to start.</p></div>;
}

export default function SkillAssessment() {
  const navigate=useNavigate();
  const { addXP }=useProgress();
  const [career]=useState(()=>readAssessmentCareer(localStorage));
  const [state,dispatch]=useReducer(quizReducer,initialQuizState);
  const [result,setResult]=useState(null);
  const [exitTo,setExitTo]=useState(null);
  const [error,setError]=useState('');
  const finishing=useRef(false);
  const bank=QUESTION_BANKS[career];
  const summary=bank?summarizeQuiz(bank,state.answers):null;
  const question=bank?.questions[state.index];
  const answer=question?state.answers[question.id]:null;

  useEffect(()=>{
    if(state.phase!=='quiz') return;
    const warn=event=>{event.preventDefault();event.returnValue='';};
    window.addEventListener('beforeunload',warn);
    return ()=>window.removeEventListener('beforeunload',warn);
  },[state.phase]);

  const finish=()=>{
    if(finishing.current) return;
    const unresolved=bank.questions.findIndex(q=>!state.answers[q.id]?.submitted&&!state.answers[q.id]?.skipped);
    if(unresolved>=0) { dispatch({type:'MOVE',index:unresolved,total:bank.questions.length});setError('Answer or skip each question before finishing.');return; }
    finishing.current=true;
    try {
      const saved=saveQuizResults(localStorage,summary,state.answers);
      if(saved.xpAdded>0) addXP(saved.xpAdded);
      setResult(saved);setError('');dispatch({type:'RESULTS'});
      window.dispatchEvent(new Event('pathwiseProfileUpdated'));
      window.dispatchEvent(new Event('pathwiseGamificationUpdated'));
    } catch { setError('Your results could not be saved. Check browser storage and try See my results again. Your answers are still here.'); }
    finally { finishing.current=false; }
  };
  const next=()=>{
    if(!answer?.submitted&&!answer?.skipped) return;
    if(state.index===bank.questions.length-1) finish();
    else {setError('');dispatch({type:'MOVE',index:state.index+1,total:bank.questions.length});}
  };
  const skip=()=>{
    dispatch({type:'SKIP',question});
    if(state.index<bank.questions.length-1) dispatch({type:'MOVE',index:state.index+1,total:bank.questions.length});
  };
  const openRoadmap=()=>{
    try {
      localStorage.setItem('selectedCareer',career);
      localStorage.setItem('assessmentCareer',career);
      localStorage.setItem('recommendedCareer',career);
      localStorage.setItem('careerRecommendation',JSON.stringify({career,score:result.overallScore,source:'skill-assessment',createdAt:result.completedAt}));
      navigate('/roadmap');
    } catch { setError('Your roadmap selection could not be saved. Check browser storage and try again.'); }
  };
  const confirmLinkExit=event=>{
    if(state.phase!=='quiz'||event.defaultPrevented) return;
    const link=event.target.closest('a[href]');
    if(link&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0) {
      const url=new URL(link.href,window.location.href);
      if(url.origin===window.location.origin) {event.preventDefault();setExitTo(url.pathname+url.search+url.hash);}
    }
  };
  const milestones=summary?.correctAnswers>=18?'18 correct answers. Look how far you’ve come.':summary?.correctAnswers>=12?'Half a dozen skills. A growing foundation.':summary?.correctAnswers>=6?'Six correct answers. Your momentum is building.':'';

  return <div className="skill-assessment" onClickCapture={confirmLinkExit}><Navbar/><main className="sa-main"><div className="sa-topline"><div className="sa-breadcrumb"><Link to="/dashboard">Dashboard</Link><span>/</span><Link to="/career-exploration">Careers</Link><span>/</span><span aria-current="page">Skill assessment</span></div>{state.phase==='quiz'&&<button className="sa-exit-button" onClick={()=>setExitTo('/career-exploration')}><Flag size={15}/>Exit assessment</button>}</div>
    {!bank?<section className="sa-panel sa-no-career"><span className="sa-career-icon"><Compass size={45}/></span><p className="sa-eyebrow">START WITH A DIRECTION</p><h1>Which path sparks your curiosity?</h1><p>Choose one of the six career paths in Career Exploration to begin its knowledge assessment.</p><Link to="/career-exploration" className="sa-button sa-primary">Explore careers</Link></section>:state.phase==='intro'?<AssessmentIntro bank={bank} onStart={()=>dispatch({type:'START'})}/>:state.phase==='results'?<Suspense fallback={<p className="sa-muted" role="status">Preparing your skill breakdown…</p>}><AssessmentResults result={result} bank={bank} answers={state.answers} onRoadmap={openRoadmap} onRestart={()=>{setResult(null);dispatch({type:'RESTART'});}}/></Suspense>:<><header className="sa-quiz-header"><div><p className="sa-eyebrow">{bank.career}</p><h1>Make room for discovery.</h1></div><QuizScore summary={summary}/></header><div className="sa-quiz-layout"><div className="sa-quiz-primary"><section className="sa-panel sa-question-progress"><div><span>Question {state.index+1} of {bank.questions.length}</span><strong>{summary.answered+summary.skipped}/{bank.questions.length} explored</strong></div><QuizProgress value={(summary.answered+summary.skipped)/bank.questions.length*100} label="Assessment questions explored"/><p>Round {question.round+1} · {bank.rounds[question.round]}</p></section>{milestones&&<p className="sa-milestone" role="status" key={milestones}><Sparkles size={17}/>{milestones}</p>}<QuizQuestion question={question} answer={answer} index={state.index} total={bank.questions.length} onSelect={option=>dispatch({type:'SELECT',question,option})} onSubmit={()=>dispatch({type:'SUBMIT',question})} onSkip={skip} onPrevious={()=>dispatch({type:'MOVE',index:state.index-1,total:bank.questions.length})} onNext={next} saving={finishing.current}/>{error&&<p className="sa-error" role="alert">{error}</p>}<p className="sa-quiz-note">Correct answers earn XP. Curiosity earns something even better: a clearer next step.</p></div><ProgressSidebar bank={bank} summary={summary} answers={state.answers} currentRound={question.round}/></div></>}
    {error&&state.phase==='results'&&<p className="sa-error" role="alert">{error}</p>}
    <footer className="sa-footer"><Link to="/dashboard"><Compass size={17}/>PathWise AI</Link><p>A clearer path. A brighter future.</p></footer></main>{exitTo&&<ExitDialog onCancel={()=>setExitTo(null)} onConfirm={()=>navigate(exitTo)}/>}</div>;
}
