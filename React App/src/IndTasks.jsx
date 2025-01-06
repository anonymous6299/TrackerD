import TaskContext from '../context/Tasks/TaskContext'
import { useContext } from 'react'
import { Link } from "react-router-dom";
import React from 'react'

const IndTasks = (props) => {
  const context = useContext(TaskContext)
  const {DelTasks} = context
  const {TaskData} = props
  return (
    <>
    <div className="my-5">
    <div className="card" style={{width: "18rem"}}>
    <div className="card-body" >
        <h4 className="card-title d-flex justify-content-evenly">
          {TaskData.TasksCompleted} Task(s) Completed
          </h4>
        <div className="d-flex justify-content-evenly align-items-center">
        <div><p className="card-text">{TaskData.date}</p></div>
        <div><p className="card-text">{TaskData.day}</p></div>
        </div>
    </div>
    <ul className="list-group list-group-flush">
        <li className="list-group-item">{TaskData.Tasks}</li>
    </ul>
    <div className="d-flex justify-content-between my-2 mx-3">
      <Link className="btn btn-primary " style={{width:"120px" }} to={`/update/${TaskData._id}`}>Update</Link>
      <button type="button" className="text-center btn btn-primary " onClick={()=>{DelTasks(TaskData._id)}} style={{width:"120px" }}>Delete</button>
    </div>

    </div>
    </div>
    </>
  )
}

export default IndTasks