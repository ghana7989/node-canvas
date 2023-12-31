import 'react-modern-drawer/dist/index.css';
import 'reactflow/dist/style.css';

import { useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlowInstance,
  ReactFlowProvider,
} from 'reactflow';
import { uid } from 'uid';

import ClientNode from './nodes/Client.node';
import DBNode from './nodes/DB.node';
import MicroserviceNode from './nodes/Microservice.node';
import RightDrawer from './RightDrawer';
import useFlowStore from './store/flowstore';
import { NodeTypes } from './types';

const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
  [NodeTypes.DB_NODE]: DBNode,
  [NodeTypes.CLIENT_NODE]: ClientNode,
};
function Flow() {
  const {
    flowKey,
    edges,
    isNodeEditDrawerOpen,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    addNode,
    toggleNodeEditDrawer,
  } = useFlowStore();

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [showSavedFlowsDrawer, setShowSavedFlowsDrawer] = useState(false);

  const handleAddNodeClick = () => {
    const newNode = {
      id: uid().toString(),
      type: NodeTypes.MICROSERVICE,
      position: {
        x: (Math.random() * window.innerWidth) / 2,
        y: (Math.random() * window.innerHeight) / 2,
      },
      data: undefined,
    };
    addNode(newNode);
  };
  const handleAddDBNodeClick = () => {
    const newNode = {
      id: uid().toString(),
      type: NodeTypes.DB_NODE,
      position: {
        x: (Math.random() * window.innerWidth) / 2,
        y: (Math.random() * window.innerHeight) / 2,
      },
      data: undefined,
    };
    addNode(newNode);
  };
  const handleAddClientNodeClick = () => {
    const newNode = {
      id: uid().toString(),
      type: NodeTypes.CLIENT_NODE,
      position: {
        x: (Math.random() * window.innerWidth) / 2,
        y: (Math.random() * window.innerHeight) / 2,
      },
      data: undefined,
    };
    addNode(newNode);
  };
  const handleSaveFlowClick = () => {
    if (!rfInstance) return;
    const flow = rfInstance.toObject();
    localStorage.setItem(flowKey, JSON.stringify(flow));
  };

  const handleLoadLastSavedFlowClick = () => {
    setShowSavedFlowsDrawer(true);
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          proOptions={{
            hideAttribution: true,
          }}
          style={{ backgroundColor: '#323434' }}
          onInit={setRfInstance}
        >
          <Panel position="top-left">
            <button
              onClick={handleAddNodeClick}
              className=" bg-gray-400 px-3 py-1 rounded-md mx-1 outline"
            >
              Add Node
            </button>
            <button
              onClick={handleSaveFlowClick}
              className=" bg-gray-400 px-3 py-1 rounded-md mx-1 outline"
            >
              Save Flow
            </button>
            <button
              onClick={handleLoadLastSavedFlowClick}
              className=" bg-gray-400 px-3 py-1 rounded-md mx-1 outline"
            >
              Load Saved Flows
            </button>
          </Panel>
          <Panel position="bottom-center">
            <button
              onClick={handleAddDBNodeClick}
              className=" bg-gray-400 px-3 py-1 rounded-md mx-1 outline"
            >
              Add DB Node
            </button>
            <button
              onClick={handleAddClientNodeClick}
              className=" bg-gray-400 px-3 py-1 rounded-md mx-1 outline"
            >
              Add Client Node
            </button>
          </Panel>
          <Panel position="top-center">
            <h1 className="text-white text-2xl">Microservice Flow Builder</h1>
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
      <RightDrawer
        type="savedFlows"
        isOpen={showSavedFlowsDrawer}
        onClose={() => {
          setShowSavedFlowsDrawer(false);
        }}
      />
    </ReactFlowProvider>
  );
}

export default Flow;
