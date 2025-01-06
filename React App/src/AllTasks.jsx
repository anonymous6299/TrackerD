import TaskContext from '../context/Tasks/TaskContext';
import { useEffect, useContext } from "react"
import IndTasks from './IndTasks'
import React from 'react'


const AllTasks = () => {
  const context = useContext(TaskContext)
  const {Data,fetchTasks} = context 

  useEffect(() => {
    fetchTasks()
  }, [])
  
  Data.forEach((element) => {
    if (!element._id||!element.user) {
      fetchTasks()
    }
  });
  return (
    <>
    <div className="container mt-4">
    <h2>Your Tasks</h2>
    <div className="d-flex justify-content-between">
    {Array.isArray(Data)&&Data.length>0?Data.map((item,index)=>{
      return <IndTasks key={index} TaskData={item}/>
    }):<h4>Your Tasks Information shall appear here.</h4>}
    </div>
    </div>
    </>
  )
}

export default AllTasks