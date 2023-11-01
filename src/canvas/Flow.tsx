import 'react-modern-drawer/dist/index.css';
import 'reactflow/dist/style.css';

import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlowInstance,
  ReactFlowProvider,
} from 'reactflow';
import { uid } from 'uid';

import useFlowStore from './flowstore';
import MicroserviceNode from './Microservice.node';
import { NodeTypes } from './types';

const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
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
    activeNode,
    setEdges,
    setNodes,
  } = useFlowStore();
  // const { setViewport } = useReactFlow();

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
      data: { label: 'New Node' },
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
  const getAllSavedFlows = () => {
    const localStorageItems = { ...localStorage };
    const savedFlows = Object.keys(localStorageItems).filter((key) =>
      key.startsWith('flowKey-'),
    );
    return savedFlows;
  };
  const loadCanvas = (flowKey: string) => {
    const flow = localStorage.getItem(flowKey);
    if (!flow) return;
    const flowObj = JSON.parse(flow);
    setNodes(flowObj.nodes);
    setEdges(flowObj.edges);
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
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      <Drawer
        open={isNodeEditDrawerOpen}
        onClose={toggleNodeEditDrawer}
        direction="right"
        size={500}
      >
        {activeNode?.id}
        <br />
        this is the current active node and respective form will be shown here
      </Drawer>
      <Drawer
        open={showSavedFlowsDrawer}
        onClose={() => {
          setShowSavedFlowsDrawer(false);
        }}
        direction="right"
        className=" p-3"
        size={500}
      >
        <h1 className="text-lg font-bold  mb-2">Saved Flows</h1>
        {getAllSavedFlows().map((flowKey) => (
          <button
            key={flowKey}
            onClick={() => {
              loadCanvas(flowKey);
            }}
            className=" bg-teal-400 px-3 py-1 rounded-md m-1 outline"
          >
            {flowKey}
          </button>
        ))}
      </Drawer>
    </ReactFlowProvider>
  );
}

export default Flow;
