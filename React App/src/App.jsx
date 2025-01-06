import AllTasks from "./AllTasks"
import NavBar from "./NavBar"
import Form from "./Form"
import { useEffect, useContext } from "react"
import TaskContext from "../context/Tasks/TaskContext"


function App() {
  const context = useContext(TaskContext)
  const {Data,fetchTasks} = context 
  
  useEffect(() => {
    fetchTasks()
  }, [])
  return (
    <>
    <NavBar/>
      <div className="text-center" style={{margin:"100px 0px"}}><h2>TrackerD - Track your daily work</h2></div>
      <Form/>
      <AllTasks/>
    </>
  )
}

export default App
