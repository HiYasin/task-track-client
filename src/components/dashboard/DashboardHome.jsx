import { Helmet } from 'react-helmet-async';
import TaskColumn from './TaskColumn';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddTask from './AddTask';
import { closestCorners, DndContext, KeyboardCode, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import useAxios from '../../customHooks/useAxios';
import Spinner from '../shared/Spinner';
import useData from '../../customHooks/useData';
import Swal from 'sweetalert2';

const DashboardHome = () => {
    const axiosPublic = useAxios();
    const { userdata, refetch } = useData();
    const [tasks, setTasks] = useState(userdata?.tasks || []);

    // Fetch user data on component mount
    useEffect(() => {
        if (userdata && userdata.tasks) {
            setTasks(userdata.tasks);
        }
    }, [userdata]);

    // update user data on backend using api
    const [updatedTasks, setUpdatedTasks] = useState([]);
    const [prevTasks, setPrevTasks] = useState([]);
    const [dragged, setDragged] = useState(false);
    useEffect(() => {
        if (dragged) {
            // Call the API to update tasks
            const updateTasks = async () => {
                try {
                    const response = await axiosPublic.patch(`/update-tasks/${userdata.email}`, { updatedTasks });
                    //console.log('Tasks updated successfully:', response.data);
                    Swal.fire({
                        position: "top-end",
                        text: "Updated tasks",
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        background: "#abdeaa",
                        color: "#0e0e0e",
                        backdrop: false,
                    })
                } catch (error) {
                    // console.error('Error updating tasks:', error);
                    Swal.fire({
                        position: "top-end",
                        text: "Error updating tasks",
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        background: "#dc644e ",
                        color: "#0e0e0e",
                        backdrop: false,
                    });
                    setTasks(prevTasks);
                }
            };
            updateTasks();
            setDragged(false);
            refetch();
        }
    }, [dragged]);

    // update tasks position in the task list according to the dragged position
    const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
    const getCategory = (id) => tasks.filter((task) => task.id === id)[0].category;
    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        if (active.id !== over.id) {
            setPrevTasks(tasks);
            setTasks((tasks) => {
                const originalPos = getTaskPos(active.id);
                let newPos;
                let newCategory;
                if (typeof over.id !== 'string') {
                    // console.log("Not Empty category")
                    newCategory = getCategory(over.id);
                    newPos = getTaskPos(over.id);
                } else {
                    // console.log("Empty category");
                    newCategory = over.id;
                    newPos = 0;
                }

                //console.log(active.id);
                //console.log(over.id);
                // console.log(newCategory);

                const updatedTasks = arrayMove(tasks, originalPos, newPos).map((task, index) => ({
                    ...task,
                    category: index === newPos ? newCategory : task.category
                }));
                setUpdatedTasks(updatedTasks);
                setDragged(true);
                return updatedTasks;
            });

            // const originalPos = getTaskPos(active.id);
            // let newPos;
            // let newCategory;
            // if (typeof over.id !== 'string') {
            //     newCategory = getCategory(over.id);
            //     newPos = getTaskPos(over.id);
            // } else {
            //     newCategory = over.id;
            //     newPos = 0;
            // }

            // console.log(newCategory);
            // const updatedTasks = arrayMove(tasks, originalPos, newPos).map((task, index) => ({
            //     ...task,
            //     category: index === newPos ? newCategory : task.category
            // }));
            // console.log(updatedTasks);
            // const updateTasks = async () => {
            //     try {
            //         const response = await axiosPublic.patch(`/update-tasks/${userdata.email}`, { updatedTasks });
            //         //console.log('Tasks updated successfully:', response.data);
            //         Swal.fire({
            //             position: "top-end",
            //             text: "Updated tasks",
            //             timer: 1000,
            //             timerProgressBar: true,
            //             showConfirmButton: false,
            //             backdrop: false,
            //         })
            //     } catch (error) {
            //         console.error('Error updating tasks:', error);
            //     }
            // };
            // updateTasks();
            // refetch();
        }
    };

    // activate mouseSensor so that we can access edit and delete buttons event
    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        // Require the touch to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });


    //columns
    const categories = [
        { id: 'To-Do', title: "To-Do" },
        { id: 'In-Progress', title: "In-Progress" },
        { id: 'Done', title: "Done" },
    ];

    // console.log(tasks);
    // modal states for adding a new task
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            {
                userdata && Object.keys(userdata).length > 0 ?
                    <div className='h-full'>
                        <Helmet>
                            <title>Task Track | Dashboard</title>
                        </Helmet>

                        <h1 className='text-4xl font-semibold text-center'>Dashboard</h1>

                        {/* Add new task button */}
                        <button
                            onClick={() => setOpen(true)}
                            className="flex gap-2 border w-fit rounded-md justify-between items-center px-2 py-1.5 text-base cursor-pointer hover:bg-gray-300 transition duration-300">
                            <FaPlus></FaPlus> Add New Task
                        </button>
                        
                        {/* Drag and Drop sortable tasks */}
                        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={[mouseSensor, touchSensor]}>
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
                        
                        {/* Add new task modal */}
                        {isOpen && (
                            <div className="fixed top-0 bg-gray-900/50 duration-300 left-0 w-full h-full shadow-2xl flex justify-center items-center z-50">
                                <AddTask setOpen={setOpen} />
                            </div>
                        )}
                    </div>
                    :
                    <Spinner />

            }
        </>
    );
};

export default DashboardHome;