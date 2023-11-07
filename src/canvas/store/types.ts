export interface NodeFormData {
  name: string;
  description: string;
}
export interface NodeStore {
  nodeIdToFormData: {
    [key: string]: NodeFormData;
  };
  setNodeFormData: (nodeId: string, formData: NodeFormData) => void;
  getNodeFormData: (nodeId: string) => NodeFormData;
}

export interface EdgeStore {
  edgeIdToFormData: {
    [key: string]: any;
  };
  // TODO: add EdgeFormData type
  setEdgeFormData: (edgeId: string, formData: any) => void;
  getEdgeFormData: (edgeId: string) => any;
}
