import TaskContext from '../context/Tasks/TaskContext';
import { useContext, useState } from 'react'

const Form = () => {


  const [Data, setData] = useState({date:"",day:"",TasksCompleted:"",Tasks:""})
  const context = useContext(TaskContext)
  const {addTasks} = context

  const onChange = (e) => {
    setData({...Data,[e.target.name]:e.target.value})
  }

  const submit = async(e) => {
    e.preventDefault();
    setData({date:"",day:"",TasksCompleted:"",Tasks:""})
    await addTasks(Data);
  }
  return (
    <>
    <div className="container">
    <form className="row g-3">
    <div className="col-md-5">
        <label htmlFor="date" value={Data.date} className="form-label">Date</label>
        <input onChange={onChange} type="date" className="form-control" id="date" name='date'/>
    </div>
    <div className="col-md-5">
    <label htmlFor="day" className="form-label">Day</label>
    <select onChange={onChange} name='day' value={Data.day} id="day" className="form-select">
      <option>Choose...</option>
      <option value={"Monday"}>Monday</option>
      <option value={"Tuesday"}>Tuesday</option>
      <option value={"Wednesday"}>Wednesday</option>
      <option value={"Thursday"}>Thursday</option>
      <option value={"Friday"}>Friday</option>
      <option value={"Saturday"}>Saturday</option>
      <option value={"Sunday"}>Sunday</option>
    </select>
        
    </div>
    <div className="col-md-2">
        <label htmlFor="nTasks" className="form-label">No. of Tasks Completed</label>
        <input onChange={onChange} value={Data.TasksCompleted} name='TasksCompleted' autoComplete='off' className="form-control" id="nTasks"/>
    </div>
    <div className="col-12">
    <label htmlFor="tasks" className="form-label">Tasks</label>
    <textarea name='Tasks' autoComplete='off' className="form-control" id="tasks" rows="5" onChange={onChange} value={Data.Tasks} style={{resize:"none"}}></textarea>
    </div>
    </form>
    <div className="d-flex justify-content-end my-4"><button type="button" onClick={submit} className="btn btn-primary">Submit</button></div>
    </div>
    </>
  )
}

export default Form