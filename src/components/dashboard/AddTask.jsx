import React from 'react';
import { FaX } from 'react-icons/fa6';
import useAuth from '../../customHooks/useAuth';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import useAxios from '../../customHooks/useAxios';
import useData from '../../customHooks/useData';
import Swal from 'sweetalert2';

const AddTask = ({ setOpen }) => {
    const { user } = useAuth();
    const axiosPublic = useAxios();
    const { userdata, refetch } = useData();

    const generateId = () => {
        // Generate a unique ID
        const timestamp = new Date().getTime();
        const randomNum = Math.floor(Math.random() * 1000000);
        return timestamp.toString() + randomNum.toString();
        // return timestamp.toString(36) + Math.random().toString(36).substr(2);
    }

    const handleAddTask = async (e) => {
        e.preventDefault();
        const taskDetails = {
            id: userdata.tasks.length+1,
            // id: generateId(new Date().toLocaleString()),
            title: e.target.title.value,
            description: e.target.description.value,
            time: new Date().toLocaleString(), // Current date and time
            category: e.target.category.value,
        };

        try {
            const response = await axiosPublic.patch(`/add-task/${user.email}`, { task: taskDetails });
            //console.log('Task added successfully:', response.data);
        } catch (error) {
            console.error('Error config:', error.config);
        }

        refetch(); // Refetch data to reflect the new task in the list
        e.target.reset();
        Swal.fire({
            title: "Good job!",
            text: "New task item added successfully.",
            icon: "success",
            confirmButtonColor: "#0e0e0e" // Set the button color to black
        });
        setOpen(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-11/12 transition-all duration-300">
            <h3 className="text-xl text-center font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleAddTask}>
                <input
                    name="title"
                    type="text"
                    placeholder="Task Title"
                    required
                    maxLength="50"
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-base"
                />
                <textarea
                    name="description"
                    placeholder="Task Description"
                    maxLength="200"
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-base"
                ></textarea>
                <select
                    name="category"
                    defaultValue="To-Do"
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-base"
                >
                    <option value="To-Do">To-Do</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Done">Done</option>
                </select>
                <div className="grid grid-cols-2 gap-2 pt-5">
                    <button className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 cursor-pointer hover:bg-gray-300 transition-all duration-200' type='submit'>
                        <AiOutlinePlusSquare size={20} /> Save
                    </button>
                    <button className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 text-red-500 cursor-pointer hover:bg-red-100 transition-all duration-200' onClick={() => setOpen(false)}>
                        <FaX size={20} />Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;