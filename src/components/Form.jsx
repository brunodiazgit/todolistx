import { useEffect, useState } from "react"
import { useTask } from "../context/TaskContext"
import TodoListContainer from "./TodoListContainer"
import { RiFileList2Fill } from "react-icons/ri"

function Form() {
    const { addTask, tasks, deleteAll, getPriorityClass, filter } = useTask()
    const [task, setTask] = useState("")
    const [priority, setPriority] = useState("Low")
    const [error, setError] = useState("")
    const [filteredTasks, setFilteredTasks] = useState([])
    const [currentFilter, setCurrentFilter] = useState(null)

    useEffect(() => {
        if (currentFilter) {
            setFilteredTasks(filter(currentFilter))
        } else {
            setFilteredTasks(tasks)
        }
    }, [tasks, currentFilter, filter])

    const handleInput = (e) => {
        let text = e.target.value
        if (text.length > 70) {
            setTask(task.slice(0, 70))
            setError('No se permiten más de 70 caracteres.')
        } else {
            setTask(text)
            setError('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (task.trim() !== '' && priority !== null && !error) {
            addTask(task, priority)
            setTask('')
            setPriority('Low')
        }
    }

    const handlePriority = (e) => {
        setPriority(e.target.value)
    }

    const handleFilter = (prio) => {
        setCurrentFilter(prio)
        setFilteredTasks(filter(prio))
    }

    const handleShowAll = () => {
        setCurrentFilter(null)
        setFilteredTasks(tasks)
    }

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="todo"></label>
                <input
                    className="input"
                    type="text"
                    name="todo"
                    id="todo"
                    placeholder="Enter your next task"
                    value={task}
                    onChange={handleInput}
                    required
                />
                <select className={`prio ${getPriorityClass(priority)}`}
                    name="priority"
                    id="priority"
                    value={priority}
                    onChange={handlePriority}>
                    <option value="Low" className="low-priority">Low</option>
                    <option value="Medium" className="medium-priority">Medium</option>
                    <option value="High" className="high-priority">High</option>
                </select>
                <button type="submit" className="btn">Add</button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="filters">
                <button onClick={() => handleFilter("Low")} className="lowfilter">L</button>
                <button onClick={() => handleFilter("Medium")} className="mediumfilter">M</button>
                <button onClick={() => handleFilter("High")} className="highfilter">H</button>
                <RiFileList2Fill onClick={() => handleShowAll()} className="all" />
            </div>
            {filteredTasks.length ? (
                <>
                    <TodoListContainer tasks={filteredTasks} />
                    <button className="deleteAll" onClick={() => deleteAll()}>Delete all</button>
                </>
            ) : (
                <p className="msg">Hey! how are you?</p>
            )}
        </div>
    )
}

export default Form
