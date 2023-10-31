import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow';

export enum NodeTypes {
  MICROSERVICE = 'microservice',
}

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  isOpen: boolean;
  toggleDrawer: () => void;
}
