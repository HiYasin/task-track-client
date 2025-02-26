import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useData from '../../customHooks/useData';
import useAxios from '../../customHooks/useAxios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import EditTask from './EditTask';
const TaskCard = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const { userdata, refetch } = useData();
    const axiosPublic = useAxios();

    const [tasks, setTasks] = useState(userdata?.tasks || []);

    // Fetch user data on component mount
    useEffect(() => {
        if (userdata && userdata.tasks) {
            setTasks(userdata.tasks);
        }
    }, [userdata]);


    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    // Delete user tasks
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
                        //console.log('Tasks updated successfully:', response.data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your task has been deleted.",
                            icon: "success",
                            confirmButtonColor: "#0e0e0e",
                        });
                        refetch();
                    } catch (error) {
                        // console.error('Error updating tasks:', error);
                        Swal.fire({
                            title: "Ops!",
                            text: "Delete operation failed.",
                            icon: "error",
                            confirmButtonColor: "#0e0e0e",
                        });
                    }
                };
                updateTasks();
                // refetch();
                // console.log(updatedTasks);
                
            }
        });
    };


    // Edit user tasks
    const [isOpen, setOpen] = useState(false);
    const handleEdit = (e) => {
        e.preventDefault();
        const editedTask = {
            ...task,
            title: e.target.title.value,
            description: e.target.description.value,
            time: new Date().toLocaleString(), // Current date and time
            category: e.target.category.value,
        };
        // console.log(taskDetails);
        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? { ...editedTask } : t
        );
        // setTasks(updatedTasks);
        // console.log(updatedTasks);
        const updateTasks = async () => {
            try {
                const response = await axiosPublic.patch(`/update-tasks/${userdata.email}`, { updatedTasks });
                // console.log('Tasks updated successfully:', response.data);
                Swal.fire({
                    title: "Updated!",
                    text: "Tasks updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#0e0e0e",
                })
                refetch();
            } catch (error) {
                // console.error('Error updating tasks:', error);
                Swal.fire({
                    title: "Ops!",
                    text: "Update operation failed.",
                    icon: "error",
                    confirmButtonColor: "#0e0e0e",
                });
            }
        };
        updateTasks();
        setOpen(false);
    }

    return (
        <>
            <div
                key={task.id}
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className='p-4 bg-white border border-gray-300 rounded-lg space-y-1 shadow-md cursor-move touch-none'>

                {/* Task Details */}
                <p className='font-semibold'>{task.title}</p>
                <p className='text-xs font-semibold text-black bg-gray-300 w-fit rounded-full px-3 py-0.5'>{new Date(task.time).toLocaleString()}</p>
                <p className='text-base text-gray-500 font-normal'>{task.description}</p>

                {/* Edit and Delete Buttons */}
                <div className='grid grid-cols-2 gap-2 pt-5'>
                    <button
                        className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 cursor-pointer hover:bg-gray-300 transition-all duration-200'
                        onClick={() => setOpen(true)}
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

                {/* Edit Task Form */}
                {isOpen && (
                    <div className="fixed top-0 bg-gray-900/50 duration-300 left-0 w-full h-full shadow-2xl flex justify-center items-center z-50">
                        <EditTask setOpen={setOpen} task={task} handleEdit={handleEdit} />
                    </div>
                )}
            </div>
        </>
    );
};

export default TaskCard;