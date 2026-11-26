// @ts-check
import { useRef, useState } from 'react';
import { BookOpen, Route } from 'lucide-react';
import { getLevel } from '../../data/learning/recommendationModel';
import { getLearningPath } from '../../data/learning/learningResources';
import { PriorityChip } from './PriorityChip';
import { ProgressBar } from './ProgressBar';
import { LearningPathAccordion } from './LearningPathAccordion';
/** @param {{item:import('../../data/learning/types').Recommendation,index:number,userId:string,onRoadmap:()=>void}} props */
export function SkillRecommendationCard({item,index,userId,onRoadmap}) {
 const [open,setOpen]=useState(false);
 const pathRef=useRef(/** @type {HTMLDivElement|null} */ (null));
 const path=getLearningPath(item.skill);
 const openPath=()=>{setOpen(true);requestAnimationFrame(()=>pathRef.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));};
 return <article className="rec-skill-card"><div className="rec-skill-header"><div className="rec-skill-identity"><span className="rec-skill-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><div><h3>{item.skill}</h3><p>Current level: <strong>{getLevel(item.score)}</strong></p></div></div><div className={`rec-score ${item.score<25?'is-low':''}`}><strong>{item.score}<small>%</small></strong><span>Skill score{!item.assessed?' · not assessed':''}</span></div></div><ProgressBar value={item.score} label={`${item.skill} assessment score`}/><div className="rec-skill-actions"><PriorityChip score={item.score}/><div><button type="button" className="rec-button rec-primary" onClick={openPath}><BookOpen size={16}/>Learn This Skill<span className="rec-sr-only">: {item.skill}</span></button><button type="button" className="rec-button rec-secondary" onClick={onRoadmap}><Route size={16}/>View Roadmap<span className="rec-sr-only"> for {item.skill}</span></button></div></div><div ref={pathRef} className="rec-path-anchor"><LearningPathAccordion path={path} userId={userId} open={open} onToggle={()=>setOpen(value=>!value)}/></div></article>;
}
