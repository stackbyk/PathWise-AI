// @ts-check
import { Clock3, Hammer } from 'lucide-react';
/** @param {{project:import('../../data/learning/types').LearningProject,completed:boolean,onChange:(id:string,checked:boolean)=>void}} props */
export function ProjectCard({project,completed,onChange}) {
 return <article className={`rec-project ${completed?'is-built':''}`}><div className="rec-project-top"><span className={`rec-project-level rec-level-${project.level.toLowerCase()}`}>{project.level}</span><Hammer size={18}/></div><h5>{project.title}</h5><p>{project.description}</p><div className="rec-project-skills"><span>Skills you’ll practice</span><ul>{project.skillsPracticed.map(skill=><li key={skill}>{skill}</li>)}</ul></div><p className="rec-tools"><strong>Free tools:</strong> {project.tools.join(' · ')}</p><div className="rec-project-footer"><span className="rec-duration"><Clock3 size={13}/>{project.estimatedHours} hours</span><label className="rec-completion"><input type="checkbox" checked={completed} onChange={event=>onChange(project.id,event.target.checked)}/><span>Mark as built<span className="rec-sr-only">: {project.title}</span></span></label></div></article>;
}
