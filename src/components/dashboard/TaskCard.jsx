import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <>
            <div
                key={task.id}
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className='p-4 bg-white border border-gray-300 rounded-lg space-y-1 shadow-md cursor-move'>
                <p className='font-semibold'>{task.title}</p>
                <p className='text-xs font-semibold text-black bg-gray-300 w-fit rounded-full px-3 py-0.5'>{new Date(task.timestamp).toLocaleString()}</p>
                <p className='text-base text-gray-500 font-normal'>{task.description}</p>
                <div className='grid grid-cols-2 gap-2 pt-5'>
                    <button className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 cursor-pointer hover:bg-gray-300 transition-all duration-200'>
                        <FaEdit />Edit
                    </button>
                    <button className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 text-red-500 cursor-pointer hover:bg-red-100 transition-all duration-200'>
                        <FaTrashAlt />Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default TaskCard;