// flowStore.ts
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  MarkerType,
  NodeChange,
} from 'reactflow';
import create from 'zustand';

import { COLORS } from '../theme';
import { FlowState } from './types';

const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  activeNode: null,
  setActiveNode: (nodeId) => {
    const node = get().nodes.find((node) => node.id === nodeId);
    set({ activeNode: node });
  },
  isNodeEditDrawerOpen: false,
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
      edges: addEdge(
        {
          ...connection,
          type: 'default',
          markerStart: {
            type: MarkerType.Arrow,
            color: COLORS.orange,
            strokeWidth: 2,
            width: 20,
          },
        },
        get().edges,
      ),
    });
  },
  toggleNodeEditDrawer: () => {
    set((state) => ({ isNodeEditDrawerOpen: !state.isNodeEditDrawerOpen }));
  },
}));

export default useFlowStore;
