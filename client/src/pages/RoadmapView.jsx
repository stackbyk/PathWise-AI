import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactFlow, { Background, Controls, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { Award, BookOpen, CheckCircle2, ChevronDown, Compass, Flag, Layers, List, LockKeyhole, Map, RotateCcw, Sparkles, Trophy, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import RoadmapNode, { RoadmapStageCard } from '../components/RoadmapNode';
import { useProgress } from '../context/ProgressContext';
import { ModulePanel, ResetDialog, RoadmapProgress } from '../components/roadmap/RoadmapPanels';
import { ROADMAP_CATALOG, PROGRESS_KEY, REWARDS_KEY, loadRoadmap, resetRoadmap, saveRoadmap, stageStatus, stageUnlocked, stagesFor, summarizeRoadmap, toggleRoadmapSkill } from '../components/roadmap/roadmapEngine';
import './PersonalizedRoadmap.css';

const nodeTypes = { careerStage:RoadmapNode };

function AchievementCards({ summary }) {
  const achievements = [
    {title:'First step',description:'Complete your first skill.',done:summary.completedSkills >= 1,icon:Flag},
    {title:'Chapter complete',description:'Finish a whole stage.',done:summary.completedStages >= 1,icon:BookOpen},
    {title:'Halfway there',description:'Reach 50% of your journey.',done:summary.percentage >= 50,icon:Layers},
    {title:'Pathfinder',description:'Complete your roadmap.',done:summary.percentage === 100,icon:Trophy},
  ];
  return <section className="rm-achievements" aria-labelledby="rm-achievements-title">
    <div className="rm-section-heading"><div><p className="rm-eyebrow">MAKE ROOM FOR THE SMALL WINS</p><h2 id="rm-achievements-title">Every chapter deserves a little celebration.</h2></div><Award size={27} /></div>
    <div className="rm-achievement-grid">{achievements.map(({title,description,done,icon:Icon}) => <article className={done ? 'rm-achievement is-unlocked' : 'rm-achievement'} key={title}><span className="rm-icon"><Icon size={23} /></span><div><h3>{title}</h3><p>{description}</p><span className="rm-achievement-status">{done ? <><CheckCircle2 size={12} />Unlocked</> : <><LockKeyhole size={12} />In your future</>}</span></div></article>)}</div>
  </section>;
}

export default function RoadmapView() {
  const { addXP } = useProgress();
  const [snapshot,setSnapshot] = useState(() => loadRoadmap(localStorage,localStorage.getItem('selectedCareer') || localStorage.getItem('assessmentCareer')));
  const current = useRef(snapshot);
  const [selectedStage,setSelectedStage] = useState(() => summarizeRoadmap(snapshot).nextStage?.id || stagesFor(snapshot.role)[0]?.id);
  const [view,setView] = useState(() => window.matchMedia('(max-width:850px)').matches ? 'list' : 'map');
  const [resetOpen,setResetOpen] = useState(false);
  const [notice,setNotice] = useState('');
  const [error,setError] = useState('');
  const panel = useRef(null);
  const summary = useMemo(() => summarizeRoadmap(snapshot),[snapshot]);
  const stages = stagesFor(snapshot.role);
  const selectedIndex = stages.findIndex(stage => String(stage.id) === String(selectedStage));
  const activeStage = selectedIndex >= 0 && stageUnlocked(snapshot.progress,stages,selectedIndex) ? stages[selectedIndex] : null;

  useEffect(() => {
    current.current = snapshot;
    try { saveRoadmap(localStorage,snapshot); }
    catch { setError('Progress cannot be saved in this browser right now. Check storage permissions before continuing.'); }
  },[snapshot]);

  useEffect(() => {
    const query = window.matchMedia('(max-width:850px)');
    const resize = event => setView(event.matches ? 'list' : 'map');
    query.addEventListener('change',resize);
    return () => query.removeEventListener('change',resize);
  },[]);

  useEffect(() => {
    const sync = event => {
      if (event.key !== PROGRESS_KEY && event.key !== REWARDS_KEY) return;
      const next = loadRoadmap(localStorage,current.current.role);
      current.current = next;
      setSnapshot(next);
    };
    window.addEventListener('storage',sync);
    return () => window.removeEventListener('storage',sync);
  },[]);

  const announceUpdate = next => {
    window.dispatchEvent(new CustomEvent('pathwiseRoadmapUpdated',{detail:{career:next.role}}));
    window.dispatchEvent(new CustomEvent('pathwiseGamificationUpdated',{detail:{career:next.role,completedSkills:summarizeRoadmap(next).completedSkills}}));
  };
  const commit = next => {
    try {
      saveRoadmap(localStorage,next);
      current.current = next;
      setSnapshot(next);
      setError('');
      announceUpdate(next);
      return true;
    } catch {
      setError('Your change could not be saved. Check browser storage and try again. Your last saved progress is safe.');
      return false;
    }
  };
  const changeCareer = event => {
    const next = loadRoadmap(localStorage,event.target.value);
    if (!commit(next)) return;
    setSelectedStage(summarizeRoadmap(next).nextStage?.id || stagesFor(next.role)[0]?.id);
    setNotice('');
  };
  const selectStage = useCallback(id => {
    const latest = current.current;
    const items = stagesFor(latest.role);
    const index = items.findIndex(stage => String(stage.id) === String(id));
    if (index < 0 || !stageUnlocked(latest.progress,items,index)) return;
    setSelectedStage(id);
    if (window.matchMedia('(max-width:1100px)').matches) {
      requestAnimationFrame(() => panel.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'start'}));
    }
  },[]);
  const toggleSkill = (stageId,name) => {
    const change = toggleRoadmapSkill(current.current,stageId,name);
    if (!change || !commit(change.snapshot)) return;
    if (change.reward > 0) addXP(change.reward);
    const latestStages = stagesFor(change.snapshot.role);
    const index = latestStages.findIndex(stage => String(stage.id) === String(stageId));
    const nextStage = latestStages[index + 1];
    if (change.stageJustCompleted) setNotice(`${latestStages[index].title} completed.${change.reward ? ` +${change.reward} XP.` : ''}${nextStage ? ' The next stage is unlocked.' : ' Your roadmap is complete.'}`);
    else setNotice(change.complete ? `${name} complete.${change.reward ? ` +${change.reward} XP.` : ' Progress saved; this reward was already earned.'}` : `${name} marked for more practice. Later progress is preserved; stages unlock again when prerequisites are complete.`);
  };
  const confirmReset = () => {
    const next = resetRoadmap(current.current);
    if (!commit(next)) return;
    setSelectedStage(stagesFor(next.role)[0]?.id);
    setResetOpen(false);
    setNotice('A fresh start for this career. Your earned XP and other careers are unchanged.');
  };

  const nodes = useMemo(() => stages.map((stage,index) => {
    const row = Math.floor(index / 2);
    const leftToRight = row % 2 === 0;
    const column = index % 2 === 0 ? (leftToRight ? 0 : 1) : (leftToRight ? 1 : 0);
    return {id:String(stage.id),type:'careerStage',position:{x:column * 380,y:row * 330},draggable:false,
      data:{index,label:stage.title,description:stage.description,duration:stage.duration,status:stageStatus(snapshot.progress,stages,index),skillCount:stage.skills.length,
        completedSkillCount:stage.skills.filter(skill => snapshot.progress[stage.id]?.[skill.name]).length,
        sourcePosition:index % 2 ? 'bottom' : leftToRight ? 'right' : 'left',
        targetPosition:index === 0 || index % 2 === 0 ? 'top' : leftToRight ? 'left' : 'right',
        onSelect:() => selectStage(stage.id)}};
  }),[stages,snapshot.progress,selectStage]);
  const edges = useMemo(() => stages.slice(1).map((stage,index) => ({id:`stage-${stages[index].id}-${stage.id}`,source:String(stages[index].id),target:String(stage.id),type:'smoothstep',
    style:{stroke:stageUnlocked(snapshot.progress,stages,index + 1) ? '#9973c2' : '#d4c5e6',strokeWidth:2},
    markerEnd:{type:MarkerType.ArrowClosed,width:15,height:15,color:'#b29acb'}})),[stages,snapshot.progress]);

  return <div className="rm-page"><Navbar /><main className="rm-main">
    <div className="rm-breadcrumb"><Link to="/dashboard">Dashboard</Link><span>/</span><span aria-current="page">Your roadmap</span></div>
    <header className="rm-heading"><div><p className="rm-eyebrow"><span />ONE SKILL. ONE STEP. YOUR FUTURE.</p><h1>A little direction.<br /><em>A world of possibility.</em></h1><p>Your next chapter is built one skill at a time. Follow your path, celebrate your progress, and keep moving forward.</p></div><div className="rm-role-picker"><label htmlFor="rm-career-select">YOUR CHOSEN PATH</label><div><select id="rm-career-select" value={snapshot.role} onChange={changeCareer}>{Object.keys(ROADMAP_CATALOG).map(role => <option key={role} value={role}>{role}</option>)}</select><ChevronDown size={18} aria-hidden="true" /></div><span>{stages.length} stages · {summary.totalSkills} skills · Your own pace</span></div></header>
    <section className="rm-overview" aria-label="Your learning progress"><div className="rm-overview-primary"><div><span className="rm-icon"><Compass size={25} /></span><div><p className="rm-eyebrow">YOUR JOURNEY SO FAR</p><h2>{summary.percentage}<small>% complete</small></h2></div></div><RoadmapProgress value={summary.percentage} label="Overall roadmap completion" /><p>{summary.completedSkills} of {summary.totalSkills} skills completed. {summary.percentage === 100 ? 'Take a moment. You did this.' : 'Every step is a step forward.'}</p></div><div className="rm-overview-stat"><Zap size={20} /><strong>{summary.earnedXP}<small>XP</small></strong><p>Earned in this journey</p><span>50 per skill · 200 per stage</span></div><div className="rm-overview-stat"><Layers size={20} /><strong>{summary.completedStages}<small>/ {stages.length}</small></strong><p>Chapters completed</p><span>Small wins. Lasting momentum.</span></div></section>
    {error && <p className="rm-error" role="alert">{error}</p>}
    <div className="rm-notice-slot" aria-live="polite" aria-atomic="true">{notice && <p className="rm-notice"><Sparkles size={17} />{notice}</p>}</div>
    <div className="rm-workspace"><section className="rm-journey" aria-labelledby="rm-journey-title"><div className="rm-journey-heading"><div><p className="rm-eyebrow">THE PATH AHEAD</p><h2 id="rm-journey-title">Your learning journey.</h2></div><div className="rm-view-toggle" role="group" aria-label="Roadmap display"><button type="button" onClick={() => setView('map')} aria-pressed={view === 'map'}><Map size={15} />Map</button><button type="button" onClick={() => setView('list')} aria-pressed={view === 'list'}><List size={15} />List</button></div></div>
      <div className="rm-legend" aria-label="Stage states"><span><i className="available" />Available</span><span><i className="in-progress" />In progress</span><span><i className="completed" />Completed</span><span><i className="locked" />Locked</span></div>
      {view === 'map' ? <><div className="rm-flow" role="region" aria-label={`${snapshot.role} connected stage map`}><ReactFlow key={snapshot.role} nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{padding:.12,maxZoom:.95}} minZoom={.35} maxZoom={1.5} nodesDraggable={false} nodesConnectable={false} nodesFocusable={false} edgesFocusable={false} elementsSelectable={false} preventScrolling={false} zoomOnScroll={false} panOnScroll={false} zoomOnPinch><Background color="#d9cbea" gap={24} size={1} /><Controls showInteractive={false} /></ReactFlow></div><p className="rm-map-help">Drag to explore · Pinch or use + / − to zoom · Choose List for a step-by-step view.</p></> : <ol className="rm-stage-list">{nodes.map(node => <li key={node.id}><span className="rm-list-connector" aria-hidden="true" /><RoadmapStageCard data={node.data} /></li>)}</ol>}
      <div className="rm-journey-footer"><span><LockKeyhole size={14} />Complete a stage to unlock the next.</span><button type="button" onClick={() => setResetOpen(true)}><RotateCcw size={14} />Reset career progress</button></div>
    </section><div className="rm-panel-anchor" ref={panel}><ModulePanel key={`${snapshot.role}-${activeStage?.id || 'none'}`} stage={activeStage} stageIndex={selectedIndex} snapshot={snapshot} onToggle={toggleSkill} onClose={() => setSelectedStage(null)} nextAvailable={!!(activeStage && stages[selectedIndex + 1] && stageUnlocked(snapshot.progress,stages,selectedIndex + 1))} onNext={() => selectStage(stages[selectedIndex + 1]?.id)} /></div></div>
    <AchievementCards summary={summary} />
    <section className="rm-next-step"><span className="rm-icon"><Compass size={26} /></span><div><p className="rm-eyebrow">GROW AT YOUR OWN PACE</p><h2>{summary.nextStage ? 'Your next small step is ready.' : 'Look how far you have come.'}</h2><p>{summary.nextStage ? summary.nextStage.title : 'Your completed journey is always here to revisit.'}</p></div><button type="button" className="rm-button rm-primary" onClick={() => selectStage(summary.nextStage?.id || stages[stages.length - 1]?.id)}>{summary.nextStage ? 'Continue learning' : 'Review final stage'}</button></section>
    <footer className="rm-footer"><Link to="/dashboard"><Compass size={17} />PathWise AI</Link><p>A clearer path. A brighter future.</p><span>Built for your becoming.</span></footer>
  </main>{resetOpen && <ResetDialog career={snapshot.role} onCancel={() => setResetOpen(false)} onReset={confirmReset} />}</div>;
}
