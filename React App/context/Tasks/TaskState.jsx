 
import TaskContext from "./TaskContext";
import { useState } from 'react';
import axios from 'axios'


const TaskState = (props) => {
    const [Data, setData] = useState([])

    const fetchTasks = async() => {
        const dbData = await axios.get("http://localhost:5000/TrackerD/home/GetData", {
        headers:{
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5OGQ0OGM1MDIzOWY2Mjg2YzhkZGM4In0sImlhdCI6MTcyMTMwMDIyOX0.aigpQ0c9tDNbfwwouibe_wgxN2jSFD-EvQHfU6sJ6fc"
        }
        })
        if (dbData!==null) {
            const {data} = dbData
            if (data.data!==undefined) {
                setData(data.data)
            }
        }
        
    }
    const addTasks = async(data) => {
        try {
            await axios.post("http://localhost:5000/TrackerD/home/AddData",data,{
                headers:{
                  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5OGQ0OGM1MDIzOWY2Mjg2YzhkZGM4In0sImlhdCI6MTcyMTMwMDIyOX0.aigpQ0c9tDNbfwwouibe_wgxN2jSFD-EvQHfU6sJ6fc"
                },
              })
              
            setData([...Data,data])
        } catch (error) {
            console.log(error)
        }  
    }

    const UpdTasks = async(data) =>{
        await axios.put(`http://localhost:5000/TrackerD/home/UpdData/${data.id}`,data, {
            headers:{
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5OGQ0OGM1MDIzOWY2Mjg2YzhkZGM4In0sImlhdCI6MTcyMTMwMDIyOX0.aigpQ0c9tDNbfwwouibe_wgxN2jSFD-EvQHfU6sJ6fc'
            }
        })

        for (let i = 0; i < Data.length; i++) {
            const element = Data[i];
            if (element._id === data.id) {
              element.day=data.day   
              element.date=data.date       
              element.TasksCompleted=data.TasksCompleted       
              element.Tasks=data.Tasks
              break
            }
        }
        let newData = JSON.parse(JSON.stringify(Data))
        setData(newData)
    }
    const DelTasks = async(id) =>{
        await axios.delete(`http://localhost:5000/TrackerD/home/DelData/${id}`, {
            headers:{
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5OGQ0OGM1MDIzOWY2Mjg2YzhkZGM4In0sImlhdCI6MTcyMTMwMDIyOX0.aigpQ0c9tDNbfwwouibe_wgxN2jSFD-EvQHfU6sJ6fc'
            }
        })

        const newData = Data.filter((item)=>{return item._id!==id})
        setData(newData)
    }
        return (
            <TaskContext.Provider value={{Data,fetchTasks,addTasks,UpdTasks, DelTasks}}>
                {props.children}
            </TaskContext.Provider>
        )
}

export default TaskState;
