import { BANK_VERSION } from '../../data/assessment/index.js';
function readJSON(storage,key,fallback) { try { return JSON.parse(storage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } }

// Compatibility adapter for the existing Results/profile formats. Roadmap currently
// uses selectedCareer only; gap recommendations remain available in the summary.
export function saveQuizResults(storage, summary, answers, completedAt = new Date().toISOString()) {
  const rewardKey=`pathwiseAssessmentReward_${summary.career}`;
  const reward=readJSON(storage,rewardKey,{});
  const previousAward=Math.max(0,Number(reward.bestXP)||0);
  const xpAdded=Math.max(0,summary.xpEarned-previousAward);
  const result={...summary,selectedCareer:summary.career,assessmentCareer:summary.career,assessmentScore:summary.overallScore,
    identifiedStrengths:summary.strongSkills.map(s=>s.name),identifiedWeakSkills:summary.skillGaps.map(s=>s.name),
    answers,completedAt,bankVersion:BANK_VERSION,xpAdded};
  const existingSkills=readJSON(storage,'pathwiseSkillData',[]);
  const skillData=Array.isArray(existingSkills) ? existingSkills : [];
  const assessedNames=new Set(summary.assessedSkills.map(s=>s.name.toLowerCase()));
  const merged=[...skillData.filter(s=>s && (!assessedNames.has(String(s.name).toLowerCase()) || (s.career && s.career!==summary.career))),...summary.assessedSkills];
  const profile=readJSON(storage,'pathwiseProfileSkills',[]);
  const profileSkills=Array.isArray(profile) ? [...profile] : [];
  const profileNames=new Set(profileSkills.map(s=>String(typeof s==='string'?s:s?.name||'').toLowerCase()));
  for(const skill of summary.assessedSkills) if(!profileNames.has(skill.name.toLowerCase())) { profileSkills.push(skill.name); profileNames.add(skill.name.toLowerCase()); }
  const entries={
    selectedCareer:summary.career,assessmentCareer:summary.career,
    assessmentResults:JSON.stringify(summary.skillWiseScores),pathwiseSkillData:JSON.stringify(merged),pathwiseProfileSkills:JSON.stringify(profileSkills),
    skillAssessmentCompleted:'true',skillAssessmentCompletedAt:completedAt,
    pathwiseAssessmentSummary:JSON.stringify({...result,updatedAt:completedAt}),pathwiseAssessmentResults:JSON.stringify(result),
    [`pathwiseAssessmentResults_${summary.career}`]:JSON.stringify(result),
    pathwiseSkillGaps:JSON.stringify(summary.skillGaps),pathwiseStrongSkills:JSON.stringify(summary.strongSkills),
    [rewardKey]:JSON.stringify({bestXP:Math.max(previousAward,summary.xpEarned),bankVersion:BANK_VERSION}),
  };
  const original=Object.fromEntries(Object.keys(entries).map(key=>[key,storage.getItem(key)]));
  try { for(const [key,value] of Object.entries(entries)) storage.setItem(key,value); }
  catch(error) {
    // Best-effort rollback of only the keys owned by this assessment save.
    for(const [key,value] of Object.entries(original)) { try { if(value===null)storage.removeItem(key);else storage.setItem(key,value); } catch { /* Storage may remain unavailable. */ } }
    throw error;
  }
  return result;
}
