import test from 'node:test';
import assert from 'node:assert/strict';
import { learningResources, cybersecurityPaths } from '../src/data/learning/learningResources.js';
import { careerSkills } from '../src/data/learning/careerSkills.js';
import { rankRecommendations, getLevel, priorityFor } from '../src/data/learning/recommendationModel.js';
import { completionKey, readCompletion } from '../src/components/recommendations/useLearningCompletion.js';
const names=['Cybersecurity Fundamentals','Network Security','Ethical Hacking','Python & Scripting','Networking','Linux','Threat Detection','Incident Response'];

test('all eight exact cybersecurity domains contain full steps, resources and three projects',()=>{
 assert.deepEqual(Object.keys(cybersecurityPaths),names);
 const ids=new Set();
 for(const name of names){
  const plan=learningResources[name];assert.equal(plan.skill,name);assert.ok(plan.summary.length>20);assert.ok(plan.estimatedWeeks>0);assert.ok(plan.steps.length>=4&&plan.steps.length<=6);
  for(const [index,step] of plan.steps.entries()){assert.equal(step.order,index+1);assert.ok(step.description.length>25);assert.ok(step.estimatedHours>0);assert.ok(!ids.has(step.id));ids.add(step.id);}
  assert.equal(plan.projects.length,3);assert.deepEqual(plan.projects.map(project=>project.level),['Beginner','Intermediate','Advanced']);
  for(const project of plan.projects){assert.ok(project.description.length>35);assert.ok(project.skillsPracticed.length&&project.tools.length);assert.ok(project.estimatedHours>0);assert.ok(!ids.has(project.id));ids.add(project.id);}
  assert.ok(plan.resources.officialDocs.length>=1);assert.ok(plan.resources.youtube.length>=2);assert.ok(plan.resources.freeCourses.length>=2);assert.ok(plan.resources.practiceLabs.length>=1);assert.ok(plan.resources.articlesAndBooks.length>=1);
  for(const group of Object.values(plan.resources))for(const resource of group){assert.ok(resource.url.startsWith('https://'));assert.ok(resource.title&&resource.access);assert.ok(resource.provider||resource.channel);}
  for(const resource of [...plan.resources.youtube,...plan.resources.freeCourses])assert.ok(resource.why);
 }
});
test('every existing career skill has a usable structured path',()=>{
 for(const skill of new Set(Object.values(careerSkills).flat())){const path=learningResources[skill];assert.ok(path,skill);assert.equal(path.skill,skill);assert.ok(path.steps.length>=4);assert.equal(path.projects.length,3);}
});
test('ranking, strong threshold and original level thresholds are preserved',()=>{
 const recommendations=rankRecommendations('Cybersecurity Engineer',{'Network Security':10,'Ethical Hacking':25,Networking:75,Linux:100});assert.equal(recommendations.length,8);assert.ok(recommendations.every((item,index)=>index===0||item.score>=recommendations[index-1].score));assert.equal(recommendations.filter(item=>item.score>=75).length,2);assert.equal(recommendations.find(item=>item.skill==='Network Security').score,10);assert.equal(getLevel(0),'Not Assessed');assert.equal(getLevel(25),'Beginner');assert.equal(getLevel(50),'Basic');assert.equal(getLevel(75),'Intermediate');assert.equal(getLevel(100),'Advanced');
});
test('empty/malformed assessments stay honest and valid zero scores are retained',()=>{
 for(const raw of [null,[],{},'broken'])assert.ok(rankRecommendations('Cybersecurity Engineer',raw).every(item=>!item.assessed));
 const list=rankRecommendations('Cybersecurity Engineer',{Linux:0,Networking:'25','Network Security':'bad'});assert.equal(list.find(item=>item.skill==='Linux').assessed,true);assert.equal(list.find(item=>item.skill==='Networking').score,25);assert.equal(list.find(item=>item.skill==='Network Security').assessed,false);
});
test('priority boundaries match the brief',()=>{assert.equal(priorityFor(24).tone,'high');assert.equal(priorityFor(25).tone,'medium');assert.equal(priorityFor(50).tone,'medium');assert.equal(priorityFor(51).tone,'on-track');});
test('learning completion is namespaced by identity and skill and tolerates invalid storage',()=>{
 const a=completionKey('user-a','Network Security'),b=completionKey('user-b','Network Security'),c=completionKey('user-a','Linux');assert.notEqual(a,b);assert.notEqual(a,c);assert.notEqual(a,completionKey('guest','Network Security'));
 assert.deepEqual(readCompletion({getItem:()=>'{bad'},a),{steps:{},projects:{}});
 const sample={steps:{one:true},projects:{built:true}};assert.deepEqual(readCompletion({getItem:key=>key===a?JSON.stringify(sample):null},a),sample);assert.deepEqual(readCompletion({getItem:key=>key===a?JSON.stringify(sample):null},b),{steps:{},projects:{}});
});
