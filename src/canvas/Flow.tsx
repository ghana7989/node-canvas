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
    edges,
    isNodeEditDrawerOpen,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    addNode,
    toggleNodeEditDrawer,
    activeNode,
  } = useFlowStore();
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
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

  return (
    <>
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
          </Panel>
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      <Drawer
        open={isNodeEditDrawerOpen}
        onClose={toggleNodeEditDrawer}
        direction="right"
        className="bla bla bla"
        size={500}
      >
        {activeNode?.id}
        <br />
        this is the current active node and respective form will be shown here
      </Drawer>
    </>
  );
}

export default Flow;
