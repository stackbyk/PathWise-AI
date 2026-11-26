// @ts-check
import { careerSkills } from './careerSkills.js';
/** @param {string} career @param {unknown} raw @returns {import('./types').Recommendation[]} */
export function rankRecommendations(career,raw) {
 const results=raw&&typeof raw==='object'&&!Array.isArray(raw)?/** @type {Record<string, unknown>} */(raw):{};
 return (careerSkills[career]||careerSkills['Full Stack Developer']).map(skill=>{
  const value=results[skill];const numeric=typeof value==='number'||typeof value==='string'?Number(value):NaN;
  const assessed=Object.hasOwn(results,skill)&&Number.isFinite(numeric)&&String(value).trim()!=='';
  return {skill,score:assessed?Math.min(100,Math.max(0,numeric)):0,assessed};
 }).sort((a,b)=>a.score-b.score);
}
/** Preserve the original level thresholds, including its zero-score label. @param {number} score */
export function getLevel(score) {
 if(score===0)return 'Not Assessed';if(score<=25)return 'Beginner';if(score<=50)return 'Basic';if(score<=75)return 'Intermediate';return 'Advanced';
}
/** @param {number} score */
export function priorityFor(score) {
 return score<25?{label:'High priority',tone:'high'}:score<=50?{label:'Medium priority',tone:'medium'}:{label:'On track',tone:'on-track'};
}
