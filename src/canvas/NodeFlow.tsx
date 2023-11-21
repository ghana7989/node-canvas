import { ErrorBoundary } from 'react-error-boundary';
import { useParams, useRouteError } from 'react-router-dom';
import ReactFlow, { Background, BackgroundVariant, Controls, Panel } from 'reactflow';
import { uid } from 'uid';

import ErrorPage from '../components/404';
import { nodeTypes } from './data';
import RightDrawer from './RightDrawer';
import { useNodeStore } from './store/nodeStore';
import { NodeTypes } from './types';

export default function NodeFlow() {
  const { nodeId } = useParams() as { nodeId: string };
  const {
    nodeIdToFlowData,
    onNodesChange,
    onConnect,
    onEdgesChange,
    addNode,
    isNodeEditDrawerOpen,
    toggleNodeEditDrawer,
  } = useNodeStore();
  if (!nodeIdToFlowData[nodeId]) return <ErrorPage />;
  const { edges, nodes } = nodeIdToFlowData[nodeId];

  const handleAddNodeClick = () => {
    const newNode = {
      id: uid().toString(),
      type: NodeTypes.NESTED_MICROSERVICE_NODE,
      position: {
        x: (Math.random() * window.innerWidth) / 2,
        y: (Math.random() * window.innerHeight) / 2,
      },
      data: undefined,
    };
    addNode(nodeId)(newNode);
  };
  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange(nodeId)}
          onEdgesChange={onEdgesChange(nodeId)}
          onConnect={onConnect(nodeId)}
          nodeTypes={nodeTypes}
          proOptions={{
            hideAttribution: true,
          }}
          style={{ backgroundColor: '#323434' }}
        >
          <Panel position="top-left">
            <button
              onClick={handleAddNodeClick}
              className=" bg-gray-400 px-3 py-1 rounded-md mx-1 outline"
            >
              Add Node
            </button>
          </Panel>
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      <RightDrawer
        type="editNode"
        isOpen={isNodeEditDrawerOpen}
        onClose={toggleNodeEditDrawer}
      />
    </>
  );
}
