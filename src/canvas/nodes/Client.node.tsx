import clsx from 'clsx';
import { useEffect } from 'react';
import { TiEdit } from 'react-icons/ti';
import { Handle, NodeProps, Position } from 'reactflow';

import useFlowStore from '../store/flowstore';
import { NodeFormData } from '../store/types';

type NodeData = NodeFormData;

export default function ClientNode({ data, selected, id }: NodeProps<NodeData>) {
  const { toggleNodeEditDrawer, setActiveNode, getNodeFormData } = useFlowStore();
  useEffect(() => {
    if (selected) setActiveNode(id);
  }, [selected]);
  return (
    <>
      <Handle type="target" position={Position.Right} />
      <div
        className={clsx(
          'border-4 w-48 h-24 flex flex-col items-center justify-center p-2 rounded-lg shadow-lg',
          {
            'bg-amber-600 border-amber-800': selected,
            'bg-amber-700 border-amber-900': !selected,
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

            {/* <Link to={`/node/${id}`}>
              <LuForward
                className="bg-orange-500 mr-1 rounded-sm cursor-pointer"
                onClick={() => {
                  addInitialNode(id);
                }}
              />
            </Link> */}
          </div>
        )}
        <div className="flex flex-col w-full items-center justify-center h-full">
          <h1>{getNodeFormData(id)?.name || 'Node Name'}</h1>
          <h3>{getNodeFormData(id)?.description || 'Node Description'}</h3>
        </div>
      </div>
      <Handle type="source" position={Position.Left} id="a" />
    </>
  );
}
