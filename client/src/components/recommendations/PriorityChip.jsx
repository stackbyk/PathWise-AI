// @ts-check
import { Flag, CheckCircle2 } from 'lucide-react';
import { priorityFor } from '../../data/learning/recommendationModel';
/** @param {{score:number}} props */
export function PriorityChip({score}) {
 const priority=priorityFor(score);const Icon=priority.tone==='on-track'?CheckCircle2:Flag;
 return <span className={`rec-priority rec-priority-${priority.tone}`}><Icon size={13}/>{priority.label}</span>;
}
