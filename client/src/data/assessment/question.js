// Authoring helper: correct answer first; the bank builder rotates option positions.
export const q = (skill, difficulty, type, text, correct, distractors, explanation, code) => ({
  skill, difficulty, type, text, options: [correct, ...distractors], correctAnswer: 0, explanation, ...(code ? { code } : {}),
});
