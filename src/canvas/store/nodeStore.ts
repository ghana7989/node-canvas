import { create } from 'zustand';

import { EdgeStore, NodeStore } from './types';

export const useNodeStore = create<NodeStore>((set, get) => ({
  nodeIdToFormData: {},
  setNodeFormData: (nodeId, formData) => {
    set((state) => ({
      nodeIdToFormData: {
        ...state.nodeIdToFormData,
        [nodeId]: formData,
      },
    }));
  },
  getNodeFormData: (nodeId) => {
    return get().nodeIdToFormData[nodeId];
  },
}));
