// @ts-check
import { Clock3, Check } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
/** @param {{steps:import('../../data/learning/types').LearningStep[],completed:Record<string,boolean>,onChange:(id:string,checked:boolean)=>void}} props */
export function StepTimeline({steps,completed,onChange}) {
 const count=steps.filter(step=>completed[step.id]===true).length;
 const next=steps.findIndex(step=>!completed[step.id]);
 return <div className="rec-step-timeline"><div className="rec-path-progress"><p><strong>{next<0?'All steps complete':`Step ${next+1} of ${steps.length}`}</strong><span>{count}/{steps.length} done</span></p><ProgressBar value={count/steps.length*100} label="Learning steps completed"/></div><ol>{steps.map(step=><li key={step.id} className={completed[step.id]?'is-done':''}><span className="rec-step-number" aria-hidden="true">{completed[step.id]?<Check size={16}/>:step.order}</span><div><h5>{step.title}</h5><p>{step.description}</p><span className="rec-duration"><Clock3 size={13}/>{step.estimatedHours} suggested hours</span><label className="rec-completion"><input type="checkbox" checked={completed[step.id]===true} onChange={event=>onChange(step.id,event.target.checked)}/><span>Mark step {step.order} as done</span></label></div></li>)}</ol><p className="rec-footnote">Your pace is your own. Suggested practice hours do not include every linked course.</p></div>;
}
