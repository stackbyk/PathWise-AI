// @ts-check
import { resourceCatalog } from './resourceCatalog.js';
/** @typedef {import('./types').SkillLearningPath} SkillLearningPath */
export const slugify = (/** @type {string} */ value) => value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
/**
 * @param {string} skill
 * @param {string} summary
 * @param {number} estimatedWeeks
 * @param {[string,string,number][]} steps
 * @param {Record<keyof import('./types').ResourceGroups, string[]>} references
 * @param {[string,string,string[],string[],number][]} projects
 * @returns {SkillLearningPath}
 */
export function createPlan(skill,summary,estimatedWeeks,steps,references,projects) {
  const slug=slugify(skill);
  /** @type {import('./types').ResourceGroups} */
  const resources={officialDocs:[],youtube:[],freeCourses:[],practiceLabs:[],articlesAndBooks:[]};
  for(const category of /** @type {(keyof typeof resources)[]} */ (Object.keys(resources))) {
    resources[category]=references[category].map(key=>{if(!resourceCatalog[key])throw new Error(`Unknown resource: ${key}`);return resourceCatalog[key];});
  }
  const levels=/** @type {const} */ (['Beginner','Intermediate','Advanced']);
  return {skill,slug,summary,estimatedWeeks,steps:steps.map(([title,description,estimatedHours],index)=>({id:`${slug}-${slugify(title)}`,order:index+1,title,description,estimatedHours})),resources,
    projects:projects.map(([title,description,skillsPracticed,tools,estimatedHours],index)=>({id:`${slug}-${slugify(title)}`,level:levels[index],title,description,skillsPracticed,tools,estimatedHours}))};
}
