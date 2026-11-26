import { Handle, Position } from 'reactflow';
import { CheckCircle2, LockKeyhole, BookOpen, Compass, Clock3 } from 'lucide-react';

export function RoadmapStageCard({ data }) {
  const locked = data.status === 'Locked';
  const StatusIcon = data.status === 'Completed' ? CheckCircle2 : locked ? LockKeyhole : data.status === 'In Progress' ? BookOpen : Compass;
  return (
    <div className={`rm-stage-node rm-status-${data.status.toLowerCase().replace(/\s/g,'-')}`}>
      <button type="button" className="rm-node-button nodrag nopan" disabled={locked}
        onClick={data.onSelect} aria-label={`${data.label}: ${data.status}${locked ? '. Complete the previous stages to unlock.' : '. Open module.'}`}>
        <div className="rm-node-top"><span className="rm-stage-index">STAGE {String(data.index + 1).padStart(2,'0')}</span><span className="rm-status"><StatusIcon size={13} />{data.status}</span></div>
        <h3>{data.label}</h3>
        <p className="rm-node-description">{data.description}</p>
        <div className="rm-node-meta"><span><Clock3 size={13} />{data.duration}</span><span>{data.completedSkillCount}/{data.skillCount} skills</span></div>
        <div className="rm-mini-progress" aria-hidden="true"><span style={{width:`${data.skillCount ? data.completedSkillCount / data.skillCount * 100 : 0}%`}} /></div>
        <span className="rm-node-action">{locked ? 'Finish earlier stages to unlock' : data.status === 'Completed' ? 'Review module' : 'Explore module'}</span>
      </button>
    </div>
  );
}

export default function RoadmapNode({ data }) {
  const positions = {top:Position.Top,bottom:Position.Bottom,left:Position.Left,right:Position.Right};
  return <><Handle type="target" position={positions[data.targetPosition] || Position.Top} isConnectable={false} /><RoadmapStageCard data={data} /><Handle type="source" position={positions[data.sourcePosition] || Position.Bottom} isConnectable={false} /></>;
}
