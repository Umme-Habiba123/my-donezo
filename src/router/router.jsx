import {
  createBrowserRouter,
  
} from "react-router";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/",
    element: <Login></Login>,
  },
]);