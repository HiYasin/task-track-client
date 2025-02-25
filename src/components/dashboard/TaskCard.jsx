import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useData from '../../customHooks/useData';
import useAxios from '../../customHooks/useAxios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
const TaskCard = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const { userdata, refetch } = useData();
    const axiosPublic = useAxios();

    const [tasks, setTasks] = useState(userdata?.tasks || []);
    useEffect(() => {
        if (userdata && userdata.tasks) {
            setTasks(userdata.tasks);
        }
    }, [userdata]);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    console.log(tasks);
    const handleDelete = () => {
        const updatedTasks = tasks.filter((t) => t.id !== task.id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#fb2c36",
            denyButtonColor: "#0e0e0e",
            cancelButtonColor: "#0e0e0e"
        }).then((result) => {
            if (result.isConfirmed) {
                // setTasks(updatedTasks);
                const updateTasks = async () => {
                    try {
                        const response = await axiosPublic.patch(`/update-tasks/${userdata.email}`, { updatedTasks });
                        console.log('Tasks updated successfully:', response.data);
                        refetch();
                    } catch (error) {
                        console.error('Error updating tasks:', error);
                    }
                };
                updateTasks();
                refetch();
                // console.log(updatedTasks);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#0e0e0e",
                });
            }
        });

    };

    const handleEdit = () => {
        const newTitle = prompt("Enter new title:", task.title);
        const newDescription = prompt("Enter new description:", task.description);

        if (newTitle !== null && newDescription !== null) {
            const updatedTasks = tasks.map((t) =>
                t.id === task.id ? { ...t, title: newTitle, description: newDescription } : t
            );
            setTasks(updatedTasks);
        }
    }

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
                <p className='text-xs font-semibold text-black bg-gray-300 w-fit rounded-full px-3 py-0.5'>{new Date(task.time).toLocaleString()}</p>
                <p className='text-base text-gray-500 font-normal'>{task.description}</p>
                <div className='grid grid-cols-2 gap-2 pt-5'>
                    <button
                        className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 cursor-pointer hover:bg-gray-300 transition-all duration-200'
                        onClick={handleEdit}
                    >
                        <FaEdit />Edit
                    </button>
                    <button
                        className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 text-red-500 cursor-pointer hover:bg-red-100 transition-all duration-200'
                        onClick={handleDelete}
                    >
                        <FaTrashAlt />Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default TaskCard;