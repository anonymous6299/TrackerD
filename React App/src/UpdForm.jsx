import { useParams,useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import TaskContext from "../context/Tasks/TaskContext";

const UpdForm = () => {
    const context =useContext(TaskContext)
    const navigate = useNavigate();
    const param = useParams()
    const id = param.id
    const {Data,UpdTasks} = context
    const [Fdata, setFdata] = useState({id:id,date:"",day:"",TasksCompleted:"",Tasks:""})
    
    useEffect(() => {
        const data = Data.filter((item)=>{
            return item._id===id
        })
        const UpdData = data[0]
        if (UpdData!==undefined) {
            setFdata({id:id,date:UpdData.date,day:UpdData.day,TasksCompleted:UpdData.TasksCompleted,Tasks:UpdData.Tasks})
        }
    }, [])
    

    const onChange = (e) => {
        setFdata({...Fdata,[e.target.name]:e.target.value})
    }

    const submit = async(e) => {
        e.preventDefault()
        await UpdTasks(Fdata)
        navigate("/")
    }
  return (
    <>
    <div className="container">
    <h2 className='text-center my-5'>Update the Task Record</h2>
    <form className="row g-3">
    <div className="col-md-5">
        <label htmlFor="date" 
        className="form-label">Date</label>
        <input onChange={onChange} type="date" className="form-control" value={Fdata.date} id="date" name='date'/>
    </div>
    <div className="col-md-5">
    <label htmlFor="day" className="form-label">Day</label>
    <select onChange={onChange} name='day' 
    value={Fdata.day} 
    id="day" className="form-select">
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
        <input onChange={onChange} 
        autoComplete='off'
        value={Fdata.TasksCompleted}
         name='TasksCompleted' className="form-control" id="nTasks"/>
    </div>
    <div className="col-12">
    <label htmlFor="tasks" className="form-label">Tasks</label>
    <textarea name='Tasks' className="form-control" id="tasks" rows="5" onChange={onChange} 
    autoComplete='off'
    value={Fdata.Tasks} 
    style={{resize:"none"}}></textarea>
    </div>
    </form>
    <div className="d-flex justify-content-end my-4"><button type="button" onClick={submit} className="btn btn-primary">Update</button></div>
    </div>
    
    </>
  )
}

export default UpdForm