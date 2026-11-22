import fullStack from './fullStack.js';
import backend from './backend.js';
import aiMl from './aiMl.js';
import dataScience from './dataScience.js';
import cybersecurity from './cybersecurity.js';
import cloud from './cloud.js';

export const BANK_VERSION = 'career-quiz-v1';
const sources = {
  'Full Stack Developer': { slug:'full-stack', questions:fullStack, icon:'code', rounds:['Web foundations','Building connected apps','Practical engineering','Reliable applications'] },
  'Backend Developer': { slug:'backend', questions:backend, icon:'server', rounds:['Service foundations','Data and reliability','Secure backend design','Production problem-solving'] },
  'AI / ML Engineer': { slug:'ai-ml', questions:aiMl, icon:'brain', rounds:['Learning foundations','Training and validation','Building robust models','Inference and evaluation'] },
  'Data Scientist': { slug:'data-science', questions:dataScience, icon:'chart', rounds:['Data foundations','Exploring and modeling','Reasoning with data','Communicating evidence'] },
  'Cybersecurity Engineer': { slug:'cybersecurity', questions:cybersecurity, icon:'shield', rounds:['Security foundations','Defense in context','Securing applications','Investigating and responding'] },
  'Cloud Engineer': { slug:'cloud', questions:cloud, icon:'cloud', rounds:['Cloud foundations','Resilient operations','Infrastructure decisions','Secure delivery'] },
};
export const QUESTION_BANKS = Object.fromEntries(Object.entries(sources).map(([career, source]) => [career, {
  career, icon:source.icon, rounds:source.rounds,
  questions:source.questions.map((question,index) => {
    const offset = index % question.options.length;
    const options = question.options.slice(offset).concat(question.options.slice(0,offset));
    return { ...question, options, correctAnswer:(question.correctAnswer - offset + options.length) % options.length,
      id:`${source.slug}-${index + 1}`, career, round:Math.floor(index / 6), xp:{Beginner:10, Intermediate:20, Advanced:30}[question.difficulty] };
  }),
}]));
const aliases = {
  'ai/ml engineer':'AI / ML Engineer','ai ml engineer':'AI / ML Engineer','ai-ml engineer':'AI / ML Engineer',
  'cybersecurity':'Cybersecurity Engineer','cyber security':'Cybersecurity Engineer','cyber security engineer':'Cybersecurity Engineer',
  'software developer':'Full Stack Developer','software engineer':'Full Stack Developer','web developer':'Full Stack Developer','full-stack developer':'Full Stack Developer',
  'data science':'Data Scientist','data analyst':'Data Scientist','backend':'Backend Developer','back-end developer':'Backend Developer','cloud':'Cloud Engineer',
};
export function normalizeAssessmentCareer(value) {
  const key = String(value || '').trim().toLowerCase().replace(/\s+/g,' ');
  return Object.keys(QUESTION_BANKS).find(career => career.toLowerCase() === key) || aliases[key] || '';
}
export function readAssessmentCareer(storage) {
  return normalizeAssessmentCareer(storage.getItem('selectedCareer')) || normalizeAssessmentCareer(storage.getItem('assessmentCareer'));
}
