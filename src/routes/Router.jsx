import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <PrivateRoute><Dashboard /></PrivateRoute>}
    ]
  },

]);

export default Router;