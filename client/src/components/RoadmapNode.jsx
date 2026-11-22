import { Handle, Position } from '@xyflow/react';
import { CheckCircle2, Lock, PlayCircle, BookOpen } from 'lucide-react';

export default function RoadmapNode({ data }) {
  const isLocked = data.status === 'Locked';
  const isCompleted = data.status === 'Completed';
  const isInProgress = data.status === 'In Progress';
  const isAvailable = data.status === 'Available';

  let bgClass = 'bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-500';
  if (isCompleted) bgClass = 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500 text-green-700 dark:text-green-400';
  if (isInProgress) bgClass = 'bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500 text-blue-700 dark:text-blue-400';
  if (isAvailable) bgClass = 'bg-white border-primary-500 dark:bg-slate-800 dark:border-primary-500 text-slate-900 dark:text-slate-100 shadow-lg shadow-primary-500/20';

  return (
    <div className={`px-4 py-3 rounded-xl border-2 min-w-[180px] transition-all ${bgClass} ${!isLocked ? 'cursor-pointer hover:scale-105' : 'opacity-70'}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-slate-400" />
      
      <div className="flex items-center gap-3">
        {isLocked && <Lock size={20} />}
        {isAvailable && <PlayCircle size={20} className="text-primary-500" />}
        {isInProgress && <BookOpen size={20} />}
        {isCompleted && <CheckCircle2 size={20} />}
        
        <div>
          <div className="font-bold text-sm">{data.label}</div>
          <div className="text-xs opacity-80">{data.status}</div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-slate-400" />
    </div>
  );
}
