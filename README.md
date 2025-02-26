# Task Track

## Introduction

**Task Track** is a simple and efficient task management web application designed to help users organize their workflow seamlessly. With a drag-and-drop interface, tasks can be categorized into **To-Do, In Progress, and Done**, ensuring a smooth tracking process. Changes are saved instantly to the database, allowing users to manage their tasks effortlessly. The application is built with modern web technologies for a responsive and user-friendly experience.

## 🌐 Live Demo

🔗 [Task Track](https://task-track-99a49.web.app/)

## 🚀 Technologies Used

The project is built with the following technologies:

- **Tailwind** - CSS  framework
- **React** – Frontend framework
- **React Router** – For dynamic routing
- **Firebase** – Authentication
- **Axios** – API requests
- **NodeJs** - Backend runtime
- **ExpressJs** - Serverside
- **MongoDB** - Nosql database

## 🛠 Packages & Dependencies

```json
{
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@tailwindcss/vite": "^4.0.7",
    "@tanstack/react-query": "^5.66.9",
    "axios": "^1.7.9",
    "firebase": "^11.3.1",
    "localforage": "^1.10.0",
    "match-sorter": "^8.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-helmet-async": "^2.0.5",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.2.0",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.17.2",
    "tailwindcss": "^4.0.7"
 }
```

## 🛠️ How to Run Locally

1️⃣ **Clone the Repository**

2️⃣ **Install Dependencies**

```bash
npm install
```

3️⃣ **Set Up environment file**

Create a `.env.local` file in the root directory and add the following variables:

```
VITE_apiKey=your_firebase_apiKey
VITE_authDomain=your_firebase_authDomain
VITE_projectId=your_firebase_projectId
VITE_storageBucket=your_firebase_storageBucket
VITE_messagingSenderId=your_firebase_messagingSenderId
VITE_appId=your_firebase_appId
```

> Note: Replace your_firebase_apiKey, your_imageUploadKey, etc., with your actual keys.
> 

Make sure to add `.env.local` to your `.gitignore` file to keep your credentials secure.

4️⃣ **Run the Application**

```bash
npm run dev
```

## Conclusion

💡 *Contributions & feedback are welcome!* 🚀

Let me know if you need any modifications! 🚀