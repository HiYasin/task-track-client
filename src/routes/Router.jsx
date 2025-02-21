import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../components/dashboard/DashboardHome";
import Profile from "../components/dashboard/Profile";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      { 
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
            path: "/dashboard",
            element: <PrivateRoute><DashboardHome /></PrivateRoute>
          },
          {
            path: "/dashboard/profile",
            element: <PrivateRoute><Profile /></PrivateRoute>
          },

        ]
      }
    ]
  },

]);

export default Router;