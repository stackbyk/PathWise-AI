export interface LearningResource {
  title: string;
  url: string;
  provider?: string;
  channel?: string;
  why?: string;
  access: string;
  accountRequired?: boolean;
  kind?: 'channel' | 'video' | 'playlist';
}
export interface LearningStep { id: string; order: number; title: string; description: string; estimatedHours: number; }
export interface LearningProject { id: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; title: string; description: string; skillsPracticed: string[]; tools: string[]; estimatedHours: number; }
export interface ResourceGroups { officialDocs: LearningResource[]; youtube: LearningResource[]; freeCourses: LearningResource[]; practiceLabs: LearningResource[]; articlesAndBooks: LearningResource[]; }
export interface SkillLearningPath { skill: string; slug: string; summary: string; estimatedWeeks: number; steps: LearningStep[]; resources: ResourceGroups; projects: LearningProject[]; }
export interface LearningCompletion { steps: Record<string, boolean>; projects: Record<string, boolean>; updatedAt?: string; }
export interface Recommendation { skill: string; score: number; assessed: boolean; }
