// @ts-check
import { useId, useRef, useState } from 'react';
import { ChevronDown, Route, Clock3, CheckCircle2 } from 'lucide-react';
import { StepTimeline } from './StepTimeline';
import { VideoGrid } from './VideoGrid';
import { ResourceList } from './ResourceList';
import { ProjectCard } from './ProjectCard';
import { useLearningCompletion } from './useLearningCompletion';
const tabs=/** @type {const} */ (['Step-by-step','Videos','Free resources','Projects']);
/** @param {{path:import('../../data/learning/types').SkillLearningPath,userId:string,open:boolean,onToggle:()=>void}} props */
export function LearningPathAccordion({path,userId,open,onToggle}) {
 const id=useId();
 const [activeTab,setActiveTab]=useState(0);
 const tabList=useRef(/** @type {HTMLDivElement|null} */ (null));
 const {progress,update,error}=useLearningCompletion(userId,path.skill);
 const finished=path.steps.filter(step=>progress.steps[step.id]===true).length;
 /** @param {import('react').KeyboardEvent<HTMLButtonElement>} event @param {number} index */
 const handleKey=(event,index)=>{
  let next=index;
  if(event.key==='ArrowRight')next=(index+1)%tabs.length;
  else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
  else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;
  event.preventDefault();setActiveTab(next);
  /** @type {HTMLButtonElement|null} */ (tabList.current?.querySelectorAll('button')[next]||null)?.focus();
 };
 return <div className={`rec-learning-accordion ${open?'is-open':''}`}><h4><button type="button" id={`${id}-trigger`} aria-expanded={open} aria-controls={`${id}-content`} onClick={onToggle}><span><Route size={18}/>Learning Path</span><span className="rec-accordion-status">{finished>0?<><CheckCircle2 size={13}/>{finished}/{path.steps.length} steps</>:<><Clock3 size={13}/>About {path.estimatedWeeks} weeks</>}<ChevronDown size={17}/></span></button></h4><div className="rec-collapse" id={`${id}-content`} role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!open} inert={!open}><div className="rec-collapse-clip"><div className="rec-path-body"><p className="rec-path-summary">{path.summary}</p><div className="rec-tabs" role="tablist" aria-label={`${path.skill} learning path`} ref={tabList}>{tabs.map((tab,index)=><button type="button" role="tab" key={tab} id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={activeTab===index} tabIndex={activeTab===index?0:-1} onClick={()=>setActiveTab(index)} onKeyDown={event=>handleKey(event,index)}>{tab}</button>)}</div>{tabs.map((tab,index)=><div key={tab} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={activeTab!==index} tabIndex={0}>{index===0?<StepTimeline steps={path.steps} completed={progress.steps} onChange={(key,checked)=>update('steps',key,checked)}/>:index===1?<VideoGrid videos={path.resources.youtube}/>:index===2?<ResourceList resources={path.resources}/>:<div className="rec-project-grid">{path.projects.map(project=><ProjectCard key={project.id} project={project} completed={progress.projects[project.id]===true} onChange={(key,checked)=>update('projects',key,checked)}/>)}</div>}</div>)}{error&&<p className="rec-error" role="alert">{error}</p>}<p className="rec-footnote">Saved for your profile on this browser. These learning checklists do not change your assessment score.</p></div></div></div></div>;
}
