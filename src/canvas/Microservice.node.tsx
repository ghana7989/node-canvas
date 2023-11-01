import clsx from 'clsx';
import { useEffect } from 'react';
import { TiArrowDownThick, TiEdit } from 'react-icons/ti';
import { Handle, NodeProps, Position } from 'reactflow';

import useFlowStore from './flowstore';

type NodeData = {
  label: string;
};

export default function MicroserviceNode({ data, selected, id }: NodeProps<NodeData>) {
  const { toggleNodeEditDrawer, setActiveNode } = useFlowStore();

  useEffect(() => {
    if (selected) setActiveNode(id);
  }, [selected]);

  return (
    <>
      <Handle type="target" position={Position.Right} />
      <div
        className={clsx(
          'border-2 w-48 h-24 flex flex-col items-center justify-center p-1 rounded-lg',
          {
            'bg-gray-700 border-orange-500': selected,
            'bg-gray-800 border-gray-900': !selected,
          },
        )}
      >
        {selected && (
          <div className="flex flex-1 justify-end items-center w-full">
            <TiEdit
              className="bg-orange-500 mr-1 rounded-sm cursor-pointer"
              onClick={() => {
                toggleNodeEditDrawer();
              }}
            />
            <TiArrowDownThick className="bg-orange-500 mr-1 rounded-sm cursor-pointer" />
          </div>
        )}
        <div className="flex flex-col w-full items-center justify-center h-full">
          <h1>Node Name</h1>
          <h3>Node Description</h3>
        </div>
      </div>
      <Handle type="source" position={Position.Left} id="a" />
    </>
  );
}
