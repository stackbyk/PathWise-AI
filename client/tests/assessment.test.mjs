import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTION_BANKS, normalizeAssessmentCareer, readAssessmentCareer } from '../src/data/assessment/index.js';
import { initialQuizState, quizReducer, summarizeQuiz } from '../src/components/assessment/quizEngine.js';
import { saveQuizResults } from '../src/components/assessment/assessmentStorage.js';
const storage=(seed={})=>{const data=new Map(Object.entries(seed));return {getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,String(value)),removeItem:key=>data.delete(key)};};
const answersFor=(bank,correct=true)=>Object.fromEntries(bank.questions.map(q=>[q.id,{selection:correct?q.correctAnswer:(q.correctAnswer+1)%q.options.length,submitted:true,skipped:false}]));

test('all six banks contain 24 unique, valid career-specific questions and mixed rounds',()=>{
 assert.equal(Object.keys(QUESTION_BANKS).length,6);
 const ids=new Set(),texts=new Set();
 for(const [career,bank] of Object.entries(QUESTION_BANKS)){
  assert.equal(bank.questions.length,24);assert.equal(new Set(bank.questions.map(q=>q.skill)).size,6);
  for(const q of bank.questions){
   assert.ok(!ids.has(q.id));ids.add(q.id);assert.ok(!texts.has(q.text)||q.type==='code');texts.add(q.text);
   assert.equal(q.career,career);assert.ok(q.text.length>15&&q.explanation.length>30);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(Number.isInteger(q.correctAnswer)&&q.correctAnswer>=0&&q.correctAnswer<4);assert.ok(q.xp>0);
  }
  for(let round=0;round<4;round++){const qs=bank.questions.filter(q=>q.round===round);assert.equal(qs.length,6);assert.equal(new Set(qs.map(q=>q.difficulty)).size,3);}
  assert.ok(bank.questions.some(q=>q.type==='code'));assert.ok(bank.questions.some(q=>q.type==='scenario'));
 }
 assert.equal(ids.size,144);
});
test('career normalization keeps Backend distinct and falls back from invalid selected career',()=>{
 assert.equal(normalizeAssessmentCareer(' Backend Developer '),'Backend Developer');assert.equal(normalizeAssessmentCareer('AI/ML Engineer'),'AI / ML Engineer');assert.equal(normalizeAssessmentCareer('cloud'),'Cloud Engineer');assert.equal(readAssessmentCareer(storage({selectedCareer:'unknown',assessmentCareer:'Data Scientist'})),'Data Scientist');assert.equal(readAssessmentCareer(storage()),'');
});
for(const bank of Object.values(QUESTION_BANKS)){
 test(`${bank.career}: real scores, skips and recommendations`,()=>{
  const all=summarizeQuiz(bank,answersFor(bank));assert.equal(all.correctAnswers,24);assert.equal(all.overallScore,100);assert.equal(all.strongSkills.length,6);assert.equal(all.skillGaps.length,0);assert.equal(all.xpEarned,bank.questions.reduce((n,q)=>n+q.xp,0));
  const wrong=summarizeQuiz(bank,answersFor(bank,false));assert.equal(wrong.xpEarned,0);assert.equal(wrong.overallScore,0);assert.equal(wrong.prioritySkills.length,6);
  const skipped=Object.fromEntries(bank.questions.map(q=>[q.id,{submitted:false,skipped:true,selection:null}]));const no=summarizeQuiz(bank,skipped);assert.equal(no.skipped,24);assert.equal(no.answered,0);assert.equal(no.xpEarned,0);assert.equal(no.overallScore,0);assert.ok(no.rounds.every(r=>r.done));
  const mixed=answersFor(bank);delete mixed[bank.questions[0].id];const score=summarizeQuiz(bank,mixed);assert.equal(score.correctAnswers,23);assert.equal(score.overallScore,96);assert.equal(score.assessedSkills.find(s=>s.name===bank.questions[0].skill).progress,75);
 });
}
test('answers lock after submission and revisiting cannot award XP twice',()=>{
 const bank=QUESTION_BANKS['Backend Developer'],q=bank.questions[0];let state=quizReducer(initialQuizState,{type:'START'});
 state=quizReducer(state,{type:'SELECT',question:q,option:q.correctAnswer});assert.equal(summarizeQuiz(bank,state.answers).xpEarned,0);
 state=quizReducer(state,{type:'SUBMIT',question:q});const locked=state;assert.equal(summarizeQuiz(bank,state.answers).xpEarned,q.xp);
 state=quizReducer(state,{type:'SELECT',question:q,option:(q.correctAnswer+1)%4});assert.equal(state,locked);
 state=quizReducer(state,{type:'SUBMIT',question:q});assert.equal(state,locked);state=quizReducer(state,{type:'SKIP',question:q});assert.equal(state,locked);
 state=quizReducer(state,{type:'MOVE',index:1,total:24});state=quizReducer(state,{type:'MOVE',index:0,total:24});assert.equal(summarizeQuiz(bank,state.answers).xpEarned,q.xp);
});
test('skipped questions can be answered on revisit; invalid selections are ignored',()=>{
 const bank=QUESTION_BANKS['Cloud Engineer'],q=bank.questions[0];let state=quizReducer(initialQuizState,{type:'START'});const old=state;
 state=quizReducer(state,{type:'SELECT',question:q,option:42});assert.equal(state,old);state=quizReducer(state,{type:'SUBMIT',question:q});assert.equal(state,old);
 state=quizReducer(state,{type:'SKIP',question:q});assert.equal(state.answers[q.id].skipped,true);
 state=quizReducer(state,{type:'SELECT',question:q,option:q.correctAnswer});state=quizReducer(state,{type:'SUBMIT',question:q});const summary=summarizeQuiz(bank,state.answers);assert.equal(summary.skipped,0);assert.equal(summary.correctAnswers,1);
});
test('results adapter saves compatible formats, preserves profile data, and prevents retake XP farming',()=>{
 const bank=QUESTION_BANKS['Full Stack Developer'],answers=answersFor(bank),summary=summarizeQuiz(bank,answers);
 const profileSkill={name:'Photography',progress:80,custom:true};const db=storage({unrelated:'keep',pathwiseProfileSkills:JSON.stringify([profileSkill,'JavaScript']),pathwiseSkillData:JSON.stringify([{name:'Python',career:'Data Scientist',progress:75}])});
 const result=saveQuizResults(db,summary,answers,'2026-11-22T12:00:00.000Z');assert.equal(result.xpAdded,summary.xpEarned);assert.equal(db.getItem('unrelated'),'keep');assert.deepEqual(JSON.parse(db.getItem('pathwiseProfileSkills'))[0],profileSkill);assert.ok(JSON.parse(db.getItem('pathwiseSkillData')).some(s=>s.career==='Data Scientist'));
 assert.equal(db.getItem('selectedCareer'),bank.career);assert.equal(db.getItem('assessmentCareer'),bank.career);assert.equal(db.getItem('skillAssessmentCompleted'),'true');assert.equal(JSON.parse(db.getItem('assessmentResults')).JavaScript,100);assert.equal(JSON.parse(db.getItem('pathwiseAssessmentResults')).correctAnswers,24);
 assert.equal(saveQuizResults(db,summary,answers).xpAdded,0);assert.equal(saveQuizResults(db,summarizeQuiz(bank,answersFor(bank,false)),answersFor(bank,false)).xpAdded,0);
});
test('an improved retake earns only the increase over the prior best',()=>{
 const bank=QUESTION_BANKS['AI / ML Engineer'],answers=answersFor(bank),partial={...answers};delete partial[bank.questions[0].id];const db=storage();const first=saveQuizResults(db,summarizeQuiz(bank,partial),partial);const second=saveQuizResults(db,summarizeQuiz(bank,answers),answers);assert.equal(second.xpAdded,bank.questions[0].xp);assert.equal(first.xpAdded+second.xpAdded,summarizeQuiz(bank,answers).xpEarned);
});
test('failed storage writes roll back only assessment-owned keys',()=>{
 const bank=QUESTION_BANKS['Cloud Engineer'],answers=answersFor(bank),db=storage({selectedCareer:'Backend Developer',unrelated:'keep'});let fail=true;const original=db.setItem;db.setItem=(key,value)=>{if(fail&&key==='pathwiseProfileSkills'){fail=false;throw Error('quota');}original(key,value);};
 assert.throws(()=>saveQuizResults(db,summarizeQuiz(bank,answers),answers));assert.equal(db.getItem('selectedCareer'),'Backend Developer');assert.equal(db.getItem('assessmentResults'),null);assert.equal(db.getItem('unrelated'),'keep');
});
