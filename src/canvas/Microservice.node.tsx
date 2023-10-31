import { useCallback } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

type NodeData = {
  label: string;
};

export default function MicroserviceNode({ data, selected }: NodeProps<NodeData>) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  return (
    <>
      <Handle type="target" position={Position.Right} />
      <div
        style={{
          backgroundColor: selected ? '#545A5A' : '#424244',
          borderColor: selected ? 'orange' : '#323434',
          borderWidth: '2px',
          width: '200px',
          height: '100px',
        }}
      >
        <div className="flex flex-col w-full items-center justify-center h-full">
          <h1>Node Name</h1>
          <h3>Node Description</h3>
        </div>
      </div>
      <Handle type="source" position={Position.Left} id="a" />
    </>
  );
}
