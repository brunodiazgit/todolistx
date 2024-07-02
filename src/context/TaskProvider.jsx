/* eslint-disable react/prop-types */
import { taskContext } from "./TaskContext"
import { useState } from "react"

function TaskProvider({children}){
    const [tasks, setTasks] = useState([])

    const addTask = (text, priority)=> {
        setTasks([...tasks,{id: Date.now(), text, priority}])
    }
    

    const deleteTask = id =>{
        setTasks(tasks.filter(task => task.id !== id)) 
    }

    const deleteAll = () => {
        setTasks([])
    }

    const editTask = (id, updatedText) =>{
        setTasks(tasks.map(task =>
            task.id === id ? {...task, text: updatedText} : task
        ))
    }

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'Low':
                return 'low-priority'
            case 'Medium':
                return 'medium-priority'
            case 'High':
                return 'high-priority'
            default:
                return ''
        }
    }

    const filter = (prio)=>{
        return tasks.filter(task => task.priority === prio)
    }


    return(
        <taskContext.Provider value={{ tasks ,addTask, deleteTask, deleteAll, editTask, getPriorityClass, filter}}>
            {children}
        </taskContext.Provider>
    )
}

export default TaskProvider