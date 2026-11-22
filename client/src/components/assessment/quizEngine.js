export const initialQuizState = { phase:'intro', index:0, answers:{} };

export function quizReducer(state, action) {
  switch(action.type) {
    case 'START': return { ...initialQuizState, phase:'quiz' };
    case 'SELECT': {
      const old = state.answers[action.question.id];
      if(state.phase !== 'quiz' || old?.submitted || !Number.isInteger(action.option) || action.option < 0 || action.option >= action.question.options.length) return state;
      return { ...state, answers:{...state.answers, [action.question.id]:{selection:action.option, submitted:false, skipped:false}} };
    }
    case 'SUBMIT': {
      const answer = state.answers[action.question.id];
      if(state.phase !== 'quiz' || answer?.submitted || !Number.isInteger(answer?.selection)) return state;
      return {...state, answers:{...state.answers,[action.question.id]:{...answer,submitted:true,skipped:false}}};
    }
    case 'SKIP': {
      if(state.answers[action.question.id]?.submitted) return state;
      return {...state, answers:{...state.answers,[action.question.id]:{selection:null,submitted:false,skipped:true}}};
    }
    case 'MOVE': return {...state,index:Math.max(0,Math.min(action.total - 1, action.index))};
    case 'RESULTS': return {...state, phase:'results'};
    case 'RESTART': return initialQuizState;
    default:return state;
  }
}
export function isCorrect(question, answer) {
  return answer?.submitted === true && answer.selection === question.correctAnswer;
}
const percentage = (correct,total) => total ? Math.round(correct / total * 100) : 0;
export function summarizeQuiz(bank, answers) {
  const questions = bank.questions;
  const correctAnswers = questions.filter(q => isCorrect(q,answers[q.id])).length;
  const answered = questions.filter(q => answers[q.id]?.submitted).length;
  const skipped = questions.filter(q => answers[q.id]?.skipped).length;
  const xpEarned = questions.reduce((xp,q) => xp + (isCorrect(q,answers[q.id]) ? q.xp : 0),0);
  const assessedSkills = [...new Set(questions.map(q => q.skill))].map(name => {
    const group = questions.filter(q => q.skill === name);
    const correct = group.filter(q => isCorrect(q,answers[q.id])).length;
    const progress = percentage(correct,group.length);
    return {name,correct,total:group.length,progress,level:progress >= 75 ? 'Advanced' : progress >= 50 ? 'Intermediate' : progress > 0 ? 'Basic' : 'Beginner',source:'assessment',career:bank.career};
  });
  const difficultyScores = ['Beginner','Intermediate','Advanced'].map(name => {
    const group = questions.filter(q=>q.difficulty===name); const correct=group.filter(q=>isCorrect(q,answers[q.id])).length;
    return {name,total:group.length,correct,progress:percentage(correct,group.length)};
  });
  const strongSkills=assessedSkills.filter(s=>s.progress>=75);
  const skillGaps=assessedSkills.filter(s=>s.progress<75);
  const prioritySkills=[...skillGaps].sort((a,b)=>a.progress-b.progress);
  const rounds=bank.rounds.map((name,index)=>{
    const group=questions.filter(q=>q.round===index);
    const completed=group.filter(q=>answers[q.id]?.submitted||answers[q.id]?.skipped).length;
    return {name,total:group.length,completed,done:completed===group.length};
  });
  // A skipped or unsubmitted question breaks the current answer streak.
  let streak=0;
  for(let i=questions.length-1;i>=0;i--) {
    const answer=answers[questions[i].id];
    if(!answer?.submitted&&!answer?.skipped) continue;
    if(!isCorrect(questions[i],answer)) break;
    streak++;
  }
  return {career:bank.career,totalQuestions:questions.length,correctAnswers,answered,skipped,overallScore:percentage(correctAnswers,questions.length),xpEarned,
    assessedSkills,skillWiseScores:Object.fromEntries(assessedSkills.map(s=>[s.name,s.progress])),strongSkills,skillGaps,prioritySkills,difficultyScores,rounds,streak};
}
