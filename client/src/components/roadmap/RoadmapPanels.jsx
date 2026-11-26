import { useEffect, useRef, useState } from 'react';
import { BookOpen, Check, CheckCircle2, Clock3, ExternalLink, LockKeyhole, Sparkles, X, Zap } from 'lucide-react';
import { roadmapQuests } from '../../utils/legacyRoadmapData';
import { isComplete, skillId, STAGE_XP } from './roadmapEngine';

export function RoadmapProgress({ value, label }) {
  return <div className="rm-progress" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${value}%`}} /></div>;
}

function SkillQuest({ skill, onComplete, onClose }) {
  const [choice,setChoice] = useState(null);
  const [submitted,setSubmitted] = useState(false);
  const quest = roadmapQuests[skill.name];
  const correct = choice === quest.answer;
  return <div className="rm-practice"><div className="rm-practice-top"><p className="rm-eyebrow">OPTIONAL SKILL QUEST</p><button type="button" aria-label="Close skill quest" onClick={onClose}><X size={17} /></button></div><h4>{quest.question}</h4><fieldset><legend className="rm-sr-only">Choose an answer</legend>{quest.options.map((option,index) => <label key={index} className={choice === index ? 'is-selected' : ''}><input type="radio" name="roadmap-quest" checked={choice === index} disabled={submitted && correct} onChange={() => {setChoice(index);setSubmitted(false);}} /><span>{option}</span></label>)}</fieldset>{submitted && <div className="rm-quest-feedback" role="status"><strong>{correct ? 'Correct. Nicely done.' : 'A chance to learn something new.'}</strong><p>{quest.explanation}</p></div>}<button type="button" className="rm-button rm-primary" disabled={choice === null} onClick={() => {if(submitted && correct){onComplete();onClose();}else setSubmitted(true);}}>{submitted && correct ? 'Mark skill complete' : 'Check answer'}</button></div>;
}

export function ModulePanel({ stage, stageIndex, snapshot, onToggle, onClose, onNext, nextAvailable }) {
  const ref = useRef(null);
  const [questSkill,setQuestSkill] = useState(null);
  useEffect(() => {setQuestSkill(null);},[stage?.id,snapshot.role]);
  const count = stage?.skills.filter(skill => snapshot.progress[stage.id]?.[skill.name]).length || 0;
  const complete = stage && isComplete(snapshot.progress,stage);
  if (!stage) return <section className="rm-module-panel rm-panel rm-empty-panel" ref={ref}><span className="rm-icon"><BookOpen size={26} /></span><h2>Your next chapter awaits.</h2><p>Select an unlocked stage to explore its skills and start making progress.</p></section>;
  return <section className="rm-module-panel rm-panel" ref={ref} aria-label={`${stage.title} module details`}>
    <div className="rm-module-top"><p className="rm-eyebrow">STAGE {String(stageIndex + 1).padStart(2,'0')} · YOUR NEXT CHAPTER</p><button type="button" aria-label="Close module details" onClick={onClose}><X size={18} /></button></div>
    <h2 tabIndex={-1} id="rm-module-heading">{stage.title}</h2><p className="rm-muted">{stage.description}</p>
    <div className="rm-module-meta"><span><Clock3 size={14} />{stage.duration}</span><span><Zap size={14} />50 XP / skill</span></div>
    <div className="rm-module-progress"><p><span>Module progress</span><strong>{count}/{stage.skills.length}</strong></p><RoadmapProgress value={Math.round(count / stage.skills.length * 100)} label={`${stage.title} completion`} /></div>
    <div className="rm-module-skills">{stage.skills.map((skill,index) => {
      const checked = snapshot.progress[stage.id]?.[skill.name] === true;
      const id = `rm-check-${stage.id}-${skillId(stage.id,skill,index)}`;
      return <div className={`rm-skill-row ${checked ? 'is-complete' : ''}`} key={skill.name}><label htmlFor={id}><input id={id} type="checkbox" checked={checked} onChange={() => onToggle(stage.id,skill.name)} /><span className="rm-checkbox" aria-hidden="true">{checked && <Check size={13} />}</span><span>{skill.name}</span></label>{skill.description && <p>{skill.description}</p>}<div className="rm-skill-links">{skill.resource && /^https?:\/\//i.test(skill.resource) && <a href={skill.resource} target="_blank" rel="noopener noreferrer"><ExternalLink size={12} />Learning resource</a>}{!checked && roadmapQuests[skill.name] && <button type="button" onClick={() => setQuestSkill(skill)}><Sparkles size={12} />Try a skill quest</button>}</div></div>;
    })}</div>
    {questSkill && <SkillQuest key={questSkill.name} skill={questSkill} onClose={() => setQuestSkill(null)} onComplete={() => {if(!snapshot.progress[stage.id]?.[questSkill.name])onToggle(stage.id,questSkill.name);}} />}
    {complete ? <div className="rm-module-complete" role="status"><CheckCircle2 size={22} /><h3>A chapter completed.</h3><p>Your progress is saved. {nextAvailable ? 'The next stage is ready when you are.' : 'Take a moment to appreciate how far you have come.'}</p>{nextAvailable && <button type="button" className="rm-button rm-primary" onClick={onNext}>Explore next stage</button>}</div> : <div className="rm-module-note"><LockKeyhole size={16} /><p>Complete every skill to unlock the next stage. First-time stage completion earns {STAGE_XP} bonus XP.</p></div>}
  </section>;
}

export function ResetDialog({ career, onCancel, onReset }) {
  const ref = useRef(null);
  useEffect(() => {const dialog = ref.current;dialog.showModal();return () => dialog.close();},[]);
  return <dialog className="rm-reset-dialog" ref={ref} aria-labelledby="rm-reset-title" onCancel={event => {event.preventDefault();onCancel();}}><span className="rm-icon"><BookOpen size={25} /></span><h2 id="rm-reset-title">A fresh chapter?</h2><p>This resets skill and stage progress for <strong>{career}</strong> only. Other careers and earned XP stay safe. Repeating a completed skill or stage will not award XP twice.</p><div className="rm-dialog-actions"><button type="button" className="rm-button rm-primary" onClick={onCancel}>Keep my progress</button><button type="button" className="rm-button rm-secondary" onClick={onReset}>Reset this career</button></div></dialog>;
}
