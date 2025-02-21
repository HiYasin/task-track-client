import { useState } from "react";

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
        "category": "In Progress"
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
        "category": "In Progress"
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
        "category": "In Progress"
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

const useTask = () => {
    const [tasks, setTasks] = useState(taskList);

    return { tasks, setTasks };
};

export default useTask;