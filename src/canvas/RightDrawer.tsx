import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// import Drawer from 'react-modern-drawer';
import Drawer from '../components/Drawer';
import SizedBox from '../components/SizedBox';
import useFlowStore from './store/flowstore';

type RightDrawerProps = (
  | {
      type: 'editNode';
      onClose: () => void;
      isOpen: boolean;
    }
  | {
      type: 'savedFlows';
      onClose: () => void;
      isOpen: boolean;
    }
) & {
  size?: number;
};
interface Inputs {
  name: string;
  description: string;
}
export default function RightDrawer(props: RightDrawerProps) {
  if (props.type === 'editNode') {
    const { toggleNodeEditDrawer, activeNode, setNodeFormData } = useFlowStore();
    console.log('activeNode: ', activeNode);

    // console.log('initialValues: ', initialValues);
    const { register, getValues, handleSubmit, setValue } = useForm<Inputs>();
    useEffect(() => {
      if (activeNode?.id) {
        setValue('name', activeNode?.data?.name || '');
        setValue('description', activeNode?.data?.description || '');
      }
    }, [activeNode?.id]);
    return (
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        direction="right"
        // size={props.size || 500}
        className="p-3 !bg-zinc-800"
        portalId={`right-drawer-portal-editNode`}
        removeWhenClosed
      >
        <h1 className="text-2xl text-orange-400 font-bold mb-2">
          Enter the below details
        </h1>
        <form
          onSubmit={handleSubmit((data) => {
            console.log('data: ', data);
          })}
        >
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Node Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-zinc-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="Enter Node Name"
            required
            {...register('name')}
          />
          <SizedBox />
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Node Description
          </label>
          <textarea
            id="description"
            className="bg-zinc-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="Enter Node Description"
            required
            {...register('description')}
          />
          <SizedBox />
          <button
            type="button"
            className="bg-orange-500 px-3 py-1 rounded-md m-1 outline"
            onClick={() => {
              if (!activeNode?.data?._type) return;
              setNodeFormData({
                _type: activeNode?.data?._type,
                name: getValues('name'),
                description: getValues('description'),
              });
              toggleNodeEditDrawer();
            }}
          >
            Save
          </button>
        </form>
      </Drawer>
    );
  } else if (props.type === 'savedFlows') {
    const { setEdges, setNodes } = useFlowStore();
    const getAllSavedFlows = () => {
      const localStorageItems = { ...localStorage };
      const savedFlows = Object.keys(localStorageItems).filter((key) =>
        key.startsWith('flowKey-'),
      );
      return savedFlows;
    };
    const loadCanvas = (flowKey: string) => {
      const flow = localStorage.getItem(flowKey);
      if (!flow) return;
      const flowObj = JSON.parse(flow);
      setNodes(flowObj.nodes);
      setEdges(flowObj.edges);
    };
    return (
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        direction="right"
        className="p-3"
        portalId="right-drawer-portal-saved-flows"
        removeWhenClosed

        // size={props.size || 500}
      >
        <h1 className="text-lg font-bold  mb-2">Saved Flows</h1>
        {getAllSavedFlows().map((flowKey) => (
          <button
            key={flowKey}
            onClick={() => {
              loadCanvas(flowKey);
            }}
            className=" bg-teal-400 px-3 py-1 rounded-md m-1 outline"
          >
            {flowKey}
          </button>
        ))}
      </Drawer>
    );
  }
  return null;
}
