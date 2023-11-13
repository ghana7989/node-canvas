import MicroserviceNode, { MicroserviceNestedNode } from './Microservice.node';
import { NodeTypes } from './types';

export const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
  [NodeTypes.NESTED_MICROSERVICE_NODE]: MicroserviceNestedNode,
};
