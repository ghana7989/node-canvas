import MicroserviceNode from './Microservice.node';
import { NodeTypes } from './types';

export const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
};
