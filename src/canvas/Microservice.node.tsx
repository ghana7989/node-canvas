import clsx from 'clsx';
import { useEffect } from 'react';
import { LuForward, LuStepBack } from 'react-icons/lu';
import { TiEdit } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { Handle, NodeProps, Position } from 'reactflow';

import useFlowStore from './store/flowstore';
import { useNodeStore } from './store/nodeStore';
import { NodeFormData } from './store/types';

type NodeData = NodeFormData;

export default function MicroserviceNode({ data, selected, id }: NodeProps<NodeData>) {
  const { toggleNodeEditDrawer, setActiveNode, getNodeFormData } = useFlowStore();
  useEffect(() => {
    if (selected) setActiveNode(id);
  }, [selected]);
  const { addInitialNode } = useNodeStore();
  // useEffect(() => {
  //   if (!nodeIdToFlowData[id]) addInitialNode(id);
  // }, []);
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

            <Link to={`/node/${id}`}>
              <LuForward
                className="bg-orange-500 mr-1 rounded-sm cursor-pointer"
                onClick={() => {
                  addInitialNode(id);
                }}
              />
            </Link>
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

export function MicroserviceNestedNode({ data, selected, id }: NodeProps<NodeData>) {
  const { setActiveNode, getNodeFormData } = useFlowStore();
  useEffect(() => {
    if (selected) setActiveNode(id);
  }, [selected]);
  const { addInitialNode, toggleNodeEditDrawer } = useNodeStore();

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

            <Link to={`/`}>
              <LuStepBack
                className="bg-orange-500 mr-1 rounded-sm cursor-pointer"
                onClick={() => {
                  addInitialNode(id);
                }}
              />
            </Link>
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
