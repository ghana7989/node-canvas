import MicroserviceNode, { MicroserviceNestedNode } from './nodes/Microservice.node';
import { NodeTypes } from './types';

export const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
  [NodeTypes.NESTED_MICROSERVICE_NODE]: MicroserviceNestedNode,
};
