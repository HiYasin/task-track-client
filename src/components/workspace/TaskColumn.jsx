import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TaskCard from './TaskCard';

const TaskColumn = ({ heading, tasks, status, background }) => {
    return (
        <div className={`w-full ${background} p-4 rounded-lg border border-gray-200`}>
            <h2 className="text-lg font-bold text-center">{heading}</h2>
            <div className='flex flex-col gap-4 mt-3'>
                {tasks.map((task, index) => {
                    if (task.category === status) {
                        return (
                            <TaskCard key={task.id} task={task} />
                        )
                    }
                })}
            </div>

        </div>
    );
};

export default TaskColumn;