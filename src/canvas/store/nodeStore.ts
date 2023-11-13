import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  NodeChange,
} from 'reactflow';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { COLORS } from '../../theme';
import { NodeStore } from './types';

export const useNodeStore = create<NodeStore>()(
  devtools(
    (set, get) => ({
      nodeIdToFlowData: {},
      addInitialNode: (nodeId) => {
        if (get().nodeIdToFlowData[nodeId]) return;
        set((state) => ({
          nodeIdToFlowData: {
            ...state.nodeIdToFlowData,
            [nodeId]: {
              nodes: [],
              edges: [],
            },
          },
        }));
      },
      activeNode: null,
      refreshActiveNode: () => {
        const { activeNode } = get();
        if (!activeNode) return;
        const latestNode = get().nodeIdToFlowData[activeNode.id].nodes.find(
          (node) => node.id === activeNode.id,
        );
        set({
          activeNode: latestNode,
        });
      },
      setActiveNode: (nodeId) => {
        const node = get().nodeIdToFlowData[nodeId].nodes.find(
          (node) => node.id === nodeId,
        );
        set({ activeNode: node });
      },
      addNode: (nodeId) => (node) => {
        set((state) => ({
          nodeIdToFlowData: {
            ...state.nodeIdToFlowData,
            [nodeId]: {
              ...state.nodeIdToFlowData[nodeId],
              nodes: state.nodeIdToFlowData[nodeId].nodes.concat(node),
            },
          },
        }));
      },
      setNodes: (nodeId) => (nodes) => {
        set((state) => ({
          nodeIdToFlowData: {
            ...state.nodeIdToFlowData,
            [nodeId]: {
              ...state.nodeIdToFlowData[nodeId],
              nodes,
            },
          },
        }));
      },
      setEdges: (nodeId) => (edges) => {
        set((state) => ({
          nodeIdToFlowData: {
            ...state.nodeIdToFlowData,
            [nodeId]: {
              ...state.nodeIdToFlowData[nodeId],
              edges,
            },
          },
        }));
      },
      setNodeFormData: (nodeId) => (nodeFormData) => {
        set((state) => ({
          nodeIdToFlowData: {
            ...state.nodeIdToFlowData,
            [nodeId]: {
              ...state.nodeIdToFlowData[nodeId],
              nodeFormData,
            },
          },
        }));
      },
      getNodeFormData: (nodeId) => {
        const node = get().nodeIdToFlowData[nodeId].nodes.find(
          (node) => node.id === nodeId,
        );
        if (!node) return;
        return node.data;
      },
      onNodesChange: (nodeId) => (changes: NodeChange[]) => {
        set((state) => ({
          nodeIdToFlowData: {
            ...state.nodeIdToFlowData,
            [nodeId]: {
              ...state.nodeIdToFlowData[nodeId],
              nodes: applyNodeChanges(changes, state.nodeIdToFlowData[nodeId].nodes),
            },
          },
        }));
        get().refreshActiveNode();
      },
      onEdgesChange: (nodeId) => (changes) => {
        set((state) => {
          const currentNode = state.nodeIdToFlowData[nodeId];
          return {
            nodeIdToFlowData: {
              ...state.nodeIdToFlowData,
              [nodeId]: {
                ...currentNode,
                edges: applyEdgeChanges(changes, currentNode.edges),
              },
            },
          };
        });
      },
      onConnect: (nodeId) => (connection) => {
        set((state) => {
          const currentNode = state.nodeIdToFlowData[nodeId];
          return {
            nodeIdToFlowData: {
              ...state.nodeIdToFlowData,
              [nodeId]: {
                ...currentNode,
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
                  currentNode.edges,
                ),
              },
            },
          };
        });
      },
      isNodeEditDrawerOpen: false,
      toggleNodeEditDrawer: () => {
        set((state) => ({ isNodeEditDrawerOpen: !state.isNodeEditDrawerOpen }));
      },
    }),
    {
      name: 'NodeStore',
    },
  ),
);
