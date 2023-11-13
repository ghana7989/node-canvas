import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow';

import { NodeFormData } from './store/types';

export enum NodeTypes {
  MICROSERVICE = 'microservice',
  NESTED_MICROSERVICE_NODE = 'nested-microservice-node',
}
export type MicroServiceNode = Node<NodeFormData | undefined>;

export interface FlowState {
  flowKey: string;
  nodes: MicroServiceNode[];
  edges: Edge[];
  activeNode: MicroServiceNode | null;
  refreshActiveNode: () => void;
  setActiveNode: (nodeId: string | number) => void;
  addNode: (node: MicroServiceNode) => void;
  setNodes: (nodes: MicroServiceNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setNodeFormData: (nodeFormData: NodeFormData) => void;
  getNodeFormData: (nodeId: string) => NodeFormData | undefined;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  isNodeEditDrawerOpen: boolean;
  toggleNodeEditDrawer: () => void;
}
