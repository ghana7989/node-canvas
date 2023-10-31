// flowStore.ts
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
} from 'reactflow';
import create from 'zustand';

import { FlowState } from './types';

const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  isOpen: false,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  addNode: (node) => {
    set((state) => ({ nodes: state.nodes.concat(node) }));
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep' }, get().edges),
    });
  },
  toggleDrawer: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));

export default useFlowStore;
