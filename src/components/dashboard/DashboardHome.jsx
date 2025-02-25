import { Helmet } from 'react-helmet-async';
import TaskColumn from './TaskColumn';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddTask from './AddTask';
import { closestCorners, DndContext, MouseSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import useData from '../../customHooks/useData';
import axios from 'axios';
import useAxios from '../../customHooks/useAxios';

const DashboardHome = () => {
    const { userdata, refetch } = useData();
    const axiosPublic = useAxios();
    console.log(userdata);

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        if (userdata && userdata.tasks) {
            setTasks(userdata.tasks);
        }
    }, []);


    const [ trigger, setTrigger ] = useState(false);
    

    useEffect(() => {
        if (tasks.length >= 0) {
            // Call the API to update tasks
            const updateTasks = async () => {
                try {
                    const response = await axiosPublic.patch(`/update-tasks/${userdata.email}`, { tasks });
                    //console.log('Tasks updated successfully:', response.data);
                } catch (error) {
                    console.error('Error updating tasks:', error);
                }
            };
            updateTasks();
            refetch();
        }
    }, [tasks]);

    const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
    const getCategory = (id) => tasks.filter((task) => task.id === id)[0].category;

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        if (active.id !== over.id) {
            setTasks((tasks) => {
                const originalPos = getTaskPos(active.id);
                let newPos;
                let newCategory;
                if (typeof over.id !== 'string') {
                    newCategory = getCategory(over.id);
                    newPos = getTaskPos(over.id);
                } else {
                    newCategory = over.id;
                    newPos = 1;
                }

                const updatedTasks = arrayMove(tasks, originalPos, newPos).map((task, index) => ({
                    ...task,
                    // category: index === newPos ? newCategory : task.category
                    category: newCategory
                }));
                //console.log(updatedTasks);
                // setDragged(!dragged);
                return updatedTasks;
            });
        }
    };

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });

    const categories = [
        { id: 'To-Do', title: "To-Do" },
        { id: 'In-Progress', title: "In-Progress" },
        { id: 'Done', title: "Done" },
    ];

    const [isOpen, setOpen] = useState(false);

    return (
        <div className='h-full'>
            <Helmet>
                <title>Task Track | Dashboard</title>
            </Helmet>

            <h1 className='text-4xl font-semibold text-center'>Dashboard</h1>

            <button
                onClick={() => setOpen(true)}
                className="flex gap-2 border w-fit rounded-md justify-between items-center px-2 py-1.5 text-base cursor-pointer hover:bg-gray-300 transition duration-300">
                <FaPlus></FaPlus> Add New Task
            </button>

            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={[mouseSensor]}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-1 md:gap-3 lg:gap-5 pt-5">
                    {
                        categories.map((column) => (
                            <TaskColumn
                                key={column.id}
                                column={column}
                                tasks={tasks.filter((task) => task.category === column.id)}
                            />
                        ))
                    }
                </div>
            </DndContext>
            {isOpen && (
                <div className="fixed top-0 bg-gray-900/50 duration-300 left-0 w-full h-full shadow-2xl flex justify-center items-center z-50">
                    <AddTask setOpen={setOpen} />
                </div>
            )}
        </div>
    );
};

export default DashboardHome;