/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { MdModeEditOutline } from "react-icons/md"
import { useTask } from "../context/TaskContext"

function TodoItem({ task }) {
    const { deleteTask, editTask, getPriorityClass } = useTask()
    const [isEditing, setIsEditing] = useState(false)
    const [newText, setNewText] = useState(task.text)
    const inputRef = useRef(null)

    const handleEdit = () => {
        if (isEditing) {
            editTask(task.id, newText)
        }
        setIsEditing(!isEditing)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleEdit()
        }
    }

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()
        }
    }, [isEditing])

    return (
        <div className="task">
            <li>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="edit-input"
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    task.text
                )}
            </li>
            <div className="btns">
                <div className="prio-position">
                    <p className={getPriorityClass(task.priority)}>{task.priority}</p>
                </div>
                <button className="task-btn" onClick={handleEdit}>
                    <MdModeEditOutline />
                </button>
                <button className="task-btn" onClick={() => deleteTask(task.id)}>
                    <BsFillTrashFill />
                </button>
            </div>
        </div>
    )
}

export default TodoItem
