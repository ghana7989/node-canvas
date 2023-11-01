import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow';

export enum NodeTypes {
  MICROSERVICE = 'microservice',
}

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  activeNode: Node | null;
  setActiveNode: (nodeId: string | number) => void;
  addNode: (node: Node) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  isNodeEditDrawerOpen: boolean;
  toggleNodeEditDrawer: () => void;
}
