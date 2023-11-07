import { create } from 'zustand';

import { EdgeStore } from './types';

export const useEdgeStore = create<EdgeStore>((set, get) => ({
  edgeIdToFormData: {},
  setEdgeFormData: (edgeId, formData) => {
    set((state) => ({
      edgeIdToFormData: {
        ...state.edgeIdToFormData,
        [edgeId]: formData,
      },
    }));
  },
  getEdgeFormData: (edgeId) => {
    return get().edgeIdToFormData[edgeId];
  },
}));
