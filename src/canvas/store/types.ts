import { Connection, Edge, EdgeChange, NodeChange } from 'reactflow';

import { MicroServiceNode } from '../types';
export interface NodeFormData {
  name: string;
  description: string;
}
export interface NodeStore {
  nodeIdToFlowData: {
    [key: string]: {
      nodes: MicroServiceNode[];
      edges: Edge[];
    };
  };
  addInitialNode: (nodeId: string) => void;
  activeNode: MicroServiceNode | null;
  refreshActiveNode: () => void;
  setActiveNode: (nodeId: string) => void;
  addNode: (nodeId: string) => (node: MicroServiceNode) => void;
  setNodes: (nodeId: string) => (nodes: MicroServiceNode[]) => void;
  setEdges: (nodeId: string) => (edges: Edge[]) => void;
  setNodeFormData: (nodeId: string) => (nodeFormData: NodeFormData) => void;
  getNodeFormData: (nodeId: string) => NodeFormData | undefined;
  onNodesChange: (nodeId: string) => (changes: NodeChange[]) => void;
  onEdgesChange: (nodeId: string) => (changes: EdgeChange[]) => void;
  onConnect: (nodeId: string) => (connection: Connection) => void;
  isNodeEditDrawerOpen: boolean;
  toggleNodeEditDrawer: () => void;
}

export interface EdgeStore {
  edgeIdToFormData: {
    [key: string]: any;
  };
  // TODO: add EdgeFormData type
  setEdgeFormData: (edgeId: string, formData: any) => void;
  getEdgeFormData: (edgeId: string) => any;
}
