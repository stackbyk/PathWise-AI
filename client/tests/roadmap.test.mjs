import test from 'node:test';
import assert from 'node:assert/strict';
import { roadmapData } from '../src/utils/roadmapData.js';
import { legacyRoadmaps } from '../src/utils/legacyRoadmapData.js';
import { ROADMAP_CATALOG, PROGRESS_KEY, REWARDS_KEY, loadRoadmap, saveRoadmap, summarizeRoadmap, stageStatus, toggleRoadmapSkill, resetRoadmap, resolveCareer } from '../src/components/roadmap/roadmapEngine.js';
const storage = (seed={}) => {const values=new Map(Object.entries(seed));return {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,String(value)),removeItem:key=>values.delete(key)};};
function completeStage(snapshot,stage) {let total=0;for(const skill of stage.skills){const result=toggleRoadmapSkill(snapshot,stage.id,skill.name);assert.ok(result);snapshot=result.snapshot;total+=result.reward;}return {snapshot,total};}

test('the two supplied curricula are authoritative and every other career is preserved',()=>{
 assert.deepEqual(ROADMAP_CATALOG['Full Stack Developer'],roadmapData['Full-Stack Developer']);assert.deepEqual(ROADMAP_CATALOG['AI / ML Engineer'],roadmapData['AI / ML Engineer']);
 for(const [role,stages] of Object.entries(legacyRoadmaps)) if(!['Full Stack Developer','AI / ML Engineer'].includes(role))assert.deepEqual(ROADMAP_CATALOG[role],stages);
 assert.equal(Object.keys(ROADMAP_CATALOG).length,Object.keys(legacyRoadmaps).length);
});
test('career aliases preserve assessment and dashboard canonical keys',()=>{assert.equal(resolveCareer(' Full-Stack Developer '),'Full Stack Developer');assert.equal(resolveCareer('backend'),'Backend Developer');assert.equal(resolveCareer('AI/ML Engineer'),'AI / ML Engineer');});
test('new journeys unlock only the first stage and show actual zero progress',()=>{
 const snapshot=loadRoadmap(storage(),'AI / ML Engineer');const stages=ROADMAP_CATALOG[snapshot.role];assert.equal(stageStatus(snapshot.progress,stages,0),'Available');assert.equal(stageStatus(snapshot.progress,stages,1),'Locked');assert.equal(summarizeRoadmap(snapshot).percentage,0);assert.equal(toggleRoadmapSkill(snapshot,stages[1].id,stages[1].skills[0].name),null);
});
test('skill completion updates status and earns XP once; undo and repeat do not farm XP',()=>{
 let snapshot=loadRoadmap(storage(),'Full Stack Developer');const stages=ROADMAP_CATALOG[snapshot.role],first=stages[0];let change=toggleRoadmapSkill(snapshot,first.id,first.skills[0].name);assert.equal(change.reward,50);snapshot=change.snapshot;assert.equal(stageStatus(snapshot.progress,stages,0),'In Progress');
 change=toggleRoadmapSkill(snapshot,first.id,first.skills[0].name);assert.equal(change.reward,0);snapshot=change.snapshot;change=toggleRoadmapSkill(snapshot,first.id,first.skills[0].name);assert.equal(change.reward,0);assert.equal(change.snapshot.rewards.earnedXP,50);
});
test('finishing a stage earns its bonus and unlocks the next; undo relocks without deleting later progress',()=>{
 let snapshot=loadRoadmap(storage(),'Full Stack Developer');const stages=ROADMAP_CATALOG[snapshot.role];const complete=completeStage(snapshot,stages[0]);snapshot=complete.snapshot;assert.equal(complete.total,stages[0].skills.length*50+200);assert.equal(stageStatus(snapshot.progress,stages,0),'Completed');assert.equal(stageStatus(snapshot.progress,stages,1),'Available');
 snapshot=toggleRoadmapSkill(snapshot,stages[1].id,stages[1].skills[0].name).snapshot;
 snapshot=toggleRoadmapSkill(snapshot,stages[0].id,stages[0].skills[0].name).snapshot;
 assert.equal(stageStatus(snapshot.progress,stages,1),'Locked');assert.equal(snapshot.progress[stages[1].id][stages[1].skills[0].name],true);
 snapshot=toggleRoadmapSkill(snapshot,stages[0].id,stages[0].skills[0].name).snapshot;assert.equal(stageStatus(snapshot.progress,stages,1),'In Progress');
});
for(const [role,stages] of Object.entries(ROADMAP_CATALOG))test(`${role}: all existing stages are usable and completion reaches 100%`,()=>{
 let snapshot=loadRoadmap(storage(),role),reward=0;
 for(const stage of stages){const complete=completeStage(snapshot,stage);snapshot=complete.snapshot;reward+=complete.total;}
 const summary=summarizeRoadmap(snapshot);assert.equal(summary.percentage,100);assert.equal(summary.completedStages,stages.length);assert.equal(reward,summary.totalSkills*50+stages.length*200);assert.equal(summary.nextStage,null);
});
test('saved progress survives reload, merges other careers, and does not duplicate XP on repeated saves',()=>{
 const db=storage({unrelated:'keep'});let snapshot=loadRoadmap(db,'Full Stack Developer');const stage=ROADMAP_CATALOG[snapshot.role][0];snapshot=toggleRoadmapSkill(snapshot,stage.id,stage.skills[0].name).snapshot;saveRoadmap(db,snapshot);saveRoadmap(db,snapshot);assert.equal(db.getItem('pathwiseXP_Full Stack Developer'),'50');
 assert.deepEqual(loadRoadmap(db,snapshot.role),snapshot);saveRoadmap(db,loadRoadmap(db,'Cloud Engineer'));assert.deepEqual(loadRoadmap(db,snapshot.role),snapshot);assert.equal(db.getItem('unrelated'),'keep');assert.equal(JSON.parse(db.getItem('pathwiseRoadmap_Full Stack Developer'))[0].skills[0].completed,true);
});
test('inactive RoadmapView progress migrates from its hyphenated role key',()=>{
 const db=storage({[PROGRESS_KEY]:JSON.stringify({'Full-Stack Developer':{1:{'HTML & CSS':true}}})});const snapshot=loadRoadmap(db,'Full Stack Developer');assert.equal(snapshot.progress[1]['HTML & CSS'],true);assert.ok(snapshot.rewards.skills.includes('1:HTML & CSS'));
});
test('old active-page completions migrate by exact names and original records are backed up',()=>{
 const old=[{id:1,title:'Old curriculum',skills:[{id:'git-old',name:'Git & GitHub',completed:true},{id:'html5',name:'HTML5',completed:true}]}];const db=storage({'pathwiseRoadmap_Full Stack Developer':JSON.stringify(old),'pathwiseCompletedSkills_Full Stack Developer':JSON.stringify({html5:true,'git-old':true})});const snapshot=loadRoadmap(db,'Full Stack Developer');assert.equal(snapshot.progress[1]['Git & GitHub'],true);assert.equal(snapshot.progress[1]['HTML & CSS'],undefined);saveRoadmap(db,snapshot);assert.deepEqual(JSON.parse(db.getItem('pathwiseRoadmapLegacy_Full Stack Developer')),old);assert.equal(JSON.parse(db.getItem('pathwiseRoadmapLegacyCompletions_Full Stack Developer')).html5,true);
});
test('reset affects only the selected career and cannot resurrect legacy progress or award old rewards twice',()=>{
 const db=storage();let a=loadRoadmap(db,'Full Stack Developer');a=completeStage(a,ROADMAP_CATALOG[a.role][0]).snapshot;saveRoadmap(db,a);let b=loadRoadmap(db,'AI / ML Engineer');b=completeStage(b,ROADMAP_CATALOG[b.role][0]).snapshot;saveRoadmap(db,b);
 const reset=resetRoadmap(a);saveRoadmap(db,reset);assert.equal(summarizeRoadmap(loadRoadmap(db,a.role)).percentage,0);assert.deepEqual(loadRoadmap(db,b.role),b);assert.equal(db.getItem(`pathwiseXP_${a.role}`),String(a.rewards.earnedXP));assert.equal(completeStage(loadRoadmap(db,a.role),ROADMAP_CATALOG[a.role][0]).total,0);
});
test('invalid storage recovers safely and a failed save rolls back roadmap-owned records',()=>{
 const db=storage({[PROGRESS_KEY]:'{broken',selectedCareer:'Data Scientist',unrelated:'keep'});const snapshot=loadRoadmap(db,'Cloud Engineer');assert.equal(summarizeRoadmap(snapshot).percentage,0);let fail=true;const set=db.setItem;db.setItem=(key,value)=>{if(fail&&key===REWARDS_KEY){fail=false;throw Error('quota');}set(key,value);};assert.throws(()=>saveRoadmap(db,snapshot));assert.equal(db.getItem(PROGRESS_KEY),'{broken');assert.equal(db.getItem('selectedCareer'),'Data Scientist');assert.equal(db.getItem('unrelated'),'keep');
});
