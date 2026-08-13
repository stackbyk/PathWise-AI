import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import RoadmapNode from '../components/RoadmapNode';

const nodeTypes = {
  customNode: RoadmapNode,
};

// Dummy data for visual testing before hooking up backend
const initialNodes = [
  { id: '1', type: 'customNode', position: { x: 250, y: 50 }, data: { label: 'HTML/CSS', status: 'Completed' } },
  { id: '2', type: 'customNode', position: { x: 250, y: 150 }, data: { label: 'JavaScript Basics', status: 'Completed' } },
  { id: '3', type: 'customNode', position: { x: 250, y: 250 }, data: { label: 'React', status: 'In Progress' } },
  { id: '4', type: 'customNode', position: { x: 100, y: 350 }, data: { label: 'State Management', status: 'Available' } },
  { id: '5', type: 'customNode', position: { x: 400, y: 350 }, data: { label: 'React Router', status: 'Locked' } },
  { id: '6', type: 'customNode', position: { x: 250, y: 450 }, data: { label: 'Next.js', status: 'Locked' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-3', source: '2', target: '3', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-4', source: '3', target: '4', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-5', source: '3', target: '5', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-6', source: '4', target: '6', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e5-6', source: '5', target: '6', markerEnd: { type: MarkerType.ArrowClosed } },
];

export default function RoadmapView() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div className="h-[80vh] w-full glass rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl relative">
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-2">Frontend Developer Roadmap</h2>
        <div className="text-sm text-slate-500">Progress: 40%</div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2">
          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '40%' }}></div>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-50 dark:bg-dark-bg"
      >
        <Background color="#94a3b8" gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
