/* eslint-disable react/prop-types */

import TodoItem from "./TodoItem"
function TodoList({tasks}) {

    return (
        <>
            {tasks.map(task => (
                <TodoItem task={task} key={task.id}/>
            ))}
        </>
    )
}

export default TodoList