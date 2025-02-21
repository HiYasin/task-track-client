import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import DropArea from './DropArea';

const TaskCard = ({ task }) => {
    return (
        <>
            <div className='p-4 bg-white rounded-lg space-y-1 shadow-md' draggable='true'>
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
            <DropArea />
        </>
    );
};

export default TaskCard;