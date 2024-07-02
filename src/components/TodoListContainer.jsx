/* eslint-disable react/prop-types */
import TodoList from "./TodoList"

function TodoListContainer({tasks}) {
    return (
        <ul className="list">
            <TodoList tasks={tasks}/>
        </ul>
    )
}

export default TodoListContainer