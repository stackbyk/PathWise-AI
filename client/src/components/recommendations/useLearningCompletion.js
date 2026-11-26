// @ts-check
import { useEffect, useState } from 'react';
import { slugify } from '../../data/learning/createPlan.js';
/** @typedef {import('../../data/learning/types').LearningCompletion} LearningCompletion */
/** @param {string} userId @param {string} skill */
export function completionKey(userId,skill) {return `pathwiseLearningProgress_v1:${encodeURIComponent(userId || 'guest')}:${slugify(skill)}`;}
/** @param {Storage | {getItem:(key:string)=>string|null}} storage @param {string} key @returns {LearningCompletion} */
export function readCompletion(storage,key) {
 try {const raw=JSON.parse(storage.getItem(key)||'null');return {steps:raw?.steps&&typeof raw.steps==='object'?raw.steps:{},projects:raw?.projects&&typeof raw.projects==='object'?raw.projects:{}};}
 catch{return {steps:{},projects:{}};}
}
/** @param {string} userId @param {string} skill */
export function useLearningCompletion(userId,skill) {
 const key=completionKey(userId,skill);
 const [snapshot,setSnapshot]=useState(()=>({key,progress:readCompletion(localStorage,key)}));
 const [error,setError]=useState('');
 const progress=snapshot.key===key?snapshot.progress:readCompletion(localStorage,key);
 useEffect(()=>{
  setSnapshot({key,progress:readCompletion(localStorage,key)});setError('');
  const sync=/** @param {StorageEvent} event */event=>{if(event.key===key)setSnapshot({key,progress:readCompletion(localStorage,key)});};
  window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);
 },[key]);
 /** @param {'steps'|'projects'} kind @param {string} id @param {boolean} checked */
 const update=(kind,id,checked)=>{
  const latest=readCompletion(localStorage,key);
  const next={...latest,[kind]:{...latest[kind],[id]:checked},updatedAt:new Date().toISOString()};
  try {localStorage.setItem(key,JSON.stringify(next));setSnapshot({key,progress:next});setError('');}
  catch {setError('Progress could not be saved. Check browser storage and try again.');}
 };
 return {progress,update,error};
}
