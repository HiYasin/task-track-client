import { Helmet } from 'react-helmet-async';
import TaskColumn from './TaskColumn';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddTask from './AddTask';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';


const taskList = [
    {
        "id": 1,
        "title": "Design UI layout",
        "description": "Create wireframes and UI components for the dashboard.",
        "timestamp": "2025-02-21T10:00:00Z",
        "category": "To-Do"
    },
    {
        "id": 2,
        "title": "Setup Firebase",
        "description": "Configure Firebase Firestore for real-time data storage.",
        "timestamp": "2025-02-21T12:30:00Z",
        "category": "In-Progress"
    },
    {
        "id": 3,
        "title": "Implement drag-and-drop",
        "description": "Enable drag-and-drop functionality for task movement.",
        "timestamp": "2025-02-20T14:15:00Z",
        "category": "Done"
    },
    {
        "id": 4,
        "title": "Create API endpoints",
        "description": "Develop RESTful API endpoints for task management.",
        "timestamp": "2025-02-21T15:45:00Z",
        "category": "To-Do"
    },
    {
        "id": 5,
        "title": "Optimize performance",
        "description": "Improve application load time and reduce API response delays.",
        "timestamp": "2025-02-22T09:30:00Z",
        "category": "In-Progress"
    },
    {
        "id": 6,
        "title": "Write unit tests",
        "description": "Create Jest test cases for core functionalities.",
        "timestamp": "2025-02-22T11:00:00Z",
        "category": "To-Do"
    },
    {
        "id": 7,
        "title": "Fix authentication bug",
        "description": "Resolve login session expiration issue in Firebase authentication.",
        "timestamp": "2025-02-22T13:20:00Z",
        "category": "In-Progress"
    },
    {
        "id": 8,
        "title": "Deploy application",
        "description": "Deploy the project to Vercel and test live functionality.",
        "timestamp": "2025-02-23T10:00:00Z",
        "category": "To-Do"
    },
    {
        "id": 9,
        "title": "Refactor codebase",
        "description": "Improve code readability and maintainability.",
        "timestamp": "2025-02-23T14:45:00Z",
        "category": "Done"
    },
    {
        "id": 10,
        "title": "Update documentation",
        "description": "Ensure README and API documentation are up to date.",
        "timestamp": "2025-02-23T16:30:00Z",
        "category": "Done"
    }
]
const DashboardHome = () => {
    const getTasks = localStorage.getItem('tasks');
    const savedTasks = JSON.parse(getTasks) || taskList;

    const [tasks, setTasks] = useState(savedTasks);

    const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
    const getCategory = (id) => tasks.filter((task) => task.id === id)[0].category;

    const handleDragEnd = ({ active, over }) => {
        // if (!over) return;

        if (active.id !== over.id) {
            setTasks(tasks => {
                const orginalPos = getTaskPos(active.id);
                let newPos = getTaskPos(over.id);
                //console.log(orginalPos, newPos);

                let newCategory;
                if (typeof over.id !== 'string') {
                    newCategory = getCategory(over.id);
                }
                else {
                    newCategory = over.id;
                    newPos = 1;
                }
                //console.log(newCategory)

                //console.log(active.id, over.id, newCategory);
                const updatedTasks = arrayMove(tasks, orginalPos, newPos).map((task, index) => ({
                    ...task,
                    category: index === newPos ? newCategory : task.category
                }));

                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                return updatedTasks;

                // return arrayMove(tasks, orginalPos, newPos);
            })
        }
        return tasks;
    };
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

            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
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