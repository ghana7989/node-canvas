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
import { uid } from 'uid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { COLORS } from '../../theme';
import { FlowState } from '../types';
import { useNodeStore } from './nodeStore';

const useFlowStore = create<FlowState>()(
  devtools((set, get) => {
    return {
      flowKey: 'flowKey-' + uid(),
      nodes: [],
      edges: [],
      activeNode: null,
      setActiveNode: (nodeId) => {
        const node = get().nodes.find((node) => node.id === nodeId);
        set({ activeNode: node });
      },
      refreshActiveNode: () => {
        const { activeNode } = get();
        if (!activeNode) return;
        set({
          activeNode: get().nodes.find((node) => node.id === activeNode.id),
        });
      },
      isNodeEditDrawerOpen: false,
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
        get().refreshActiveNode();
      },
      addNode: (node) => {
        set((state) => ({ nodes: state.nodes.concat(node) }));
      },
      setNodes: (nodes) => {
        set({ nodes });
      },
      setEdges: (edges) => {
        set({ edges });
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
      setNodeFormData: (nodeFormData) => {
        const { activeNode } = get();
        if (!activeNode) return;

        const updatedNode = {
          ...activeNode,
          data: {
            ...activeNode.data,
            ...nodeFormData,
          },
        };

        set({
          nodes: get().nodes.map((node) => {
            if (node.id === activeNode.id) {
              return updatedNode;
            }
            return node;
          }),
        });
      },
      getNodeFormData: (nodeId) => {
        const node = get().nodes.find((node) => node.id === nodeId);
        if (!node) return undefined;
        return node.data;
      },
    };
  }),
);

export default useFlowStore;
