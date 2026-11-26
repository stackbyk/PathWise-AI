import { roadmapData } from '../../utils/roadmapData.js';
import { legacyRoadmaps } from '../../utils/legacyRoadmapData.js';

export const PROGRESS_KEY = 'pathwise-roadmap-progress-v1';
export const REWARDS_KEY = 'pathwise-roadmap-rewards-v2';
export const SKILL_XP = 50;
export const STAGE_XP = 200;
export const canonicalCareer = name => name === 'Full-Stack Developer' ? 'Full Stack Developer' : name;
// The user's roadmapData is authoritative where provided. Retain every other
// existing career rather than replacing those definitions with invented content.
export const ROADMAP_CATALOG = {
  ...legacyRoadmaps,
  ...Object.fromEntries(Object.entries(roadmapData).map(([role,stages]) => [canonicalCareer(role),stages])),
};
const normalizeName = value => String(value || '').trim().toLowerCase().replace(/\s+/g,' ');
export function resolveCareer(value) {
  const key = normalizeName(value).replace(/full-stack/g,'full stack');
  const exact = Object.keys(ROADMAP_CATALOG).find(role => normalizeName(role) === key);
  if (exact) return exact;
  const aliases = { 'ai/ml engineer':'AI / ML Engineer', 'ai ml engineer':'AI / ML Engineer', 'backend':'Backend Developer', 'cyber security engineer':'Cybersecurity Engineer' };
  return aliases[key] || 'Full Stack Developer';
}
export function readJSON(storage,key,fallback) {
  try { const value = JSON.parse(storage.getItem(key) || 'null'); return value ?? fallback; }
  catch { return fallback; }
}
const objectOrEmpty = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
export function skillKey(stageId,name) { return `${stageId}:${name}`; }
export function skillId(stageId,skill,index) { return skill.id || `stage-${stageId}-skill-${index + 1}`; }
export function stagesFor(role) { return ROADMAP_CATALOG[role] || []; }
export function isComplete(progress,stage) { return stage.skills.length > 0 && stage.skills.every(skill => progress[stage.id]?.[skill.name] === true); }
export function stageUnlocked(progress,stages,index) { return stages.slice(0,index).every(stage => isComplete(progress,stage)); }
export function stageStatus(progress,stages,index) {
  const stage = stages[index];
  if (!stageUnlocked(progress,stages,index)) return 'Locked';
  if (isComplete(progress,stage)) return 'Completed';
  return stage.skills.some(skill => progress[stage.id]?.[skill.name]) ? 'In Progress' : 'Available';
}
export function summarizeRoadmap(snapshot) {
  const stages = stagesFor(snapshot.role);
  const totalSkills = stages.reduce((n,stage) => n + stage.skills.length,0);
  const completedSkills = stages.reduce((n,stage) => n + stage.skills.filter(skill => snapshot.progress[stage.id]?.[skill.name] === true).length,0);
  const completedStages = stages.filter(stage => isComplete(snapshot.progress,stage)).length;
  return {totalSkills,completedSkills,completedStages,percentage:totalSkills ? Math.round(completedSkills / totalSkills * 100) : 0,
    earnedXP: snapshot.rewards.earnedXP, nextStage:stages.find((stage,index) => stageUnlocked(snapshot.progress,stages,index) && !isComplete(snapshot.progress,stage)) || null};
}
export function loadRoadmap(storage,roleValue) {
  const role = resolveCareer(roleValue);
  const stages = stagesFor(role);
  const all = objectOrEmpty(readJSON(storage,PROGRESS_KEY,{}));
  const alias = role === 'Full Stack Developer' ? 'Full-Stack Developer' : role;
  const hasRole = Object.hasOwn(all,role) || Object.hasOwn(all,alias);
  let progress = objectOrEmpty(all[role] ?? all[alias]);
  if (!hasRole) {
    progress = {};
    const oldRoadmap = readJSON(storage,`pathwiseRoadmap_${role}`,[]);
    const legacy = Array.isArray(oldRoadmap) && oldRoadmap.length ? oldRoadmap : (legacyRoadmaps[role] || []);
    const flags = objectOrEmpty(readJSON(storage,`pathwiseCompletedSkills_${role}`,{}));
    // Only exact skill-name matches migrate. Different curricula stay preserved
    // in the legacy backup; a combined skill is never inferred from one old item.
    const completedNames = new Set(legacy.flatMap(stage => Array.isArray(stage.skills) ? stage.skills : [])
      .filter(skill => skill.completed === true || flags[skill.id] === true).map(skill => normalizeName(skill.name)));
    for (const stage of stages) for (const skill of stage.skills) if (skill.completed === true || completedNames.has(normalizeName(skill.name))) {
      progress[stage.id] = {...progress[stage.id],[skill.name]:true};
    }
  }
  const allRewards = objectOrEmpty(readJSON(storage,REWARDS_KEY,{}));
  const previous = objectOrEmpty(allRewards[role]);
  const existingSkills = stages.flatMap(stage => stage.skills.filter(skill => progress[stage.id]?.[skill.name] === true).map(skill => skillKey(stage.id,skill.name)));
  const existingStages = stages.filter(stage => isComplete(progress,stage)).map(stage => String(stage.id));
  const rewards = {
    skills: Array.isArray(previous.skills) ? previous.skills : existingSkills,
    stages: Array.isArray(previous.stages) ? previous.stages : existingStages,
    earnedXP: Math.max(0,Number(previous.earnedXP) || 0),
  };
  return {role,progress,rewards};
}
export function toggleRoadmapSkill(snapshot,stageId,name) {
  const stages = stagesFor(snapshot.role);
  const index = stages.findIndex(stage => String(stage.id) === String(stageId));
  if (index < 0 || !stageUnlocked(snapshot.progress,stages,index)) return null;
  const stage = stages[index];
  if (!stage.skills.some(skill => skill.name === name)) return null;
  const complete = snapshot.progress[stage.id]?.[name] !== true;
  const progress = {...snapshot.progress,[stage.id]:{...snapshot.progress[stage.id],[name]:complete}};
  const key = skillKey(stage.id,name);
  const skills = new Set(snapshot.rewards.skills);
  const awardedStages = new Set(snapshot.rewards.stages);
  let reward = 0;
  if (complete && !skills.has(key)) { skills.add(key); reward += SKILL_XP; }
  const stageJustCompleted = complete && !isComplete(snapshot.progress,stage) && isComplete(progress,stage);
  if (stageJustCompleted && !awardedStages.has(String(stage.id))) { awardedStages.add(String(stage.id)); reward += STAGE_XP; }
  return {snapshot:{...snapshot,progress,rewards:{skills:[...skills],stages:[...awardedStages],earnedXP:snapshot.rewards.earnedXP + reward}},reward,complete,stageJustCompleted};
}
export function resetRoadmap(snapshot) { return {...snapshot,progress:{}}; }

export function saveRoadmap(storage,snapshot) {
  const {role,progress,rewards} = snapshot;
  const stages = stagesFor(role);
  const all = objectOrEmpty(readJSON(storage,PROGRESS_KEY,{}));
  const allRewards = objectOrEmpty(readJSON(storage,REWARDS_KEY,{}));
  const oldFlags = objectOrEmpty(readJSON(storage,`pathwiseCompletedSkills_${role}`,{}));
  // A reset clears flags for this career, including its old curriculum. Keep the
  // original snapshot separately so data from a former curriculum is not lost.
  const flags = Object.fromEntries(Object.keys(oldFlags).map(key => [key,false]));
  const hydrated = stages.map(stage => ({...stage,skills:stage.skills.map((skill,index) => {
    const id = skillId(stage.id,skill,index);
    const completed = progress[stage.id]?.[skill.name] === true;
    flags[id] = completed;
    return {...skill,id,completed};
  })}));
  const entries = {
    [PROGRESS_KEY]:JSON.stringify({...all,[role]:progress}),
    [REWARDS_KEY]:JSON.stringify({...allRewards,[role]:rewards}),
    [`pathwiseRoadmap_${role}`]:JSON.stringify(hydrated),
    [`pathwiseCompletedSkills_${role}`]:JSON.stringify(flags),
    selectedCareer:role,assessmentCareer:role,
  };
  const backup = `pathwiseRoadmapLegacy_${role}`;
  const raw = storage.getItem(`pathwiseRoadmap_${role}`);
  if (raw && storage.getItem(backup) === null && !Object.hasOwn(all,role)) entries[backup] = raw;
  const legacyFlagsKey = `pathwiseRoadmapLegacyCompletions_${role}`;
  const rawFlags = storage.getItem(`pathwiseCompletedSkills_${role}`);
  if (rawFlags && storage.getItem(legacyFlagsKey) === null && !Object.hasOwn(all,role)) entries[legacyFlagsKey] = rawFlags;
  const previousReward = objectOrEmpty(allRewards[role]);
  const delta = Math.max(0,rewards.earnedXP - (Number(previousReward.earnedXP) || 0));
  entries[`pathwiseXP_${role}`] = String(Math.max(0,Number(storage.getItem(`pathwiseXP_${role}`)) || 0) + delta);
  entries.pathwiseCompletedSkillsCount = String(Object.keys(ROADMAP_CATALOG).reduce((total,career) => total + summarizeRoadmap(career === role ? snapshot : loadRoadmap(storage,career)).completedSkills,0));
  const before = Object.fromEntries(Object.keys(entries).map(key => [key,storage.getItem(key)]));
  try { for (const [key,value] of Object.entries(entries)) if (storage.getItem(key) !== value) storage.setItem(key,value); }
  catch (error) {
    for (const [key,value] of Object.entries(before)) { try { if(value===null)storage.removeItem(key);else storage.setItem(key,value); } catch { /* Storage may still be unavailable. */ } }
    throw error;
  }
  return hydrated;
}
