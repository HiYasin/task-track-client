import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../About";
import Main from "../layouts/Main";
import Dashboard from "../pages/Dashboard";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <About /> },
      { path: "/dashboard", element: <Dashboard />}
    ]
  },

]);

export default Router;