import React from 'react';
import { FaX } from 'react-icons/fa6';
import { AiOutlinePlusSquare } from 'react-icons/ai';

const EditTask = ({ setOpen, task, handleEdit }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-11/12 transition-all duration-300">
            <h3 className="text-xl text-center font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleEdit}>
                <input
                    name="title"
                    type="text"
                    placeholder="Task Title"
                    required
                    maxLength="50"
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-base"
                    defaultValue={task.title}
                />
                <textarea
                    name="description"
                    placeholder="Task Description"
                    maxLength="200"
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-base"
                    defaultValue={task.description}
                ></textarea>
                <select
                    name="category"
                    defaultValue={task.category}
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-base"
                >
                    <option value="To-Do">To-Do</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Done">Done</option>
                </select>
                <div className="grid grid-cols-2 gap-2 pt-5">
                    <button className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 cursor-pointer hover:bg-gray-300 transition-all duration-200' type='submit'>
                        <AiOutlinePlusSquare size={20} /> Update
                    </button>
                    <button className='text-base px-2 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-500 text-red-500 cursor-pointer hover:bg-red-100 transition-all duration-200' onClick={() => setOpen(false)}>
                        <FaX size={20} />Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;