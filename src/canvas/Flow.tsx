import 'react-modern-drawer/dist/index.css';
import 'reactflow/dist/style.css';

import Drawer from 'react-modern-drawer';
import ReactFlow, { Background, BackgroundVariant, Controls, Panel } from 'reactflow';

import useFlowStore from './flowstore';
import MicroserviceNode from './Microservice.node';
import { NodeTypes } from './types';

const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
};
function Flow() {
  const {
    edges,
    isOpen,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    toggleDrawer,
    addNode,
  } = useFlowStore();

  const handleAddNodeClick = () => {
    const newNode = {
      id: Math.random().toString(),
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
        >
          <Panel position="top-left">
            <button
              onClick={toggleDrawer}
              className=" bg-orange-500 px-3 py-1 rounded-md mx-1 outline"
            >
              Show
            </button>
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
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
        size={500}
      >
        <div>There Goes One Hell of a form here</div>
      </Drawer>
    </>
  );
}

export default Flow;
