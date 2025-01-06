import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import TaskState from '../context/Tasks/TaskState.jsx';
import ReactDOM from 'react-dom/client'
import UpdForm from './UpdForm.jsx';
import NavBar from './NavBar.jsx';
import App from './App.jsx'
import React from 'react'
import About from "./About.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskState><App/></TaskState>,
  },
  {
    path: "/update/:id",
    element: <TaskState><NavBar/><UpdForm/></TaskState>,
  },
  {
    path: "/about",
    element: <TaskState><NavBar/><About/></TaskState>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
