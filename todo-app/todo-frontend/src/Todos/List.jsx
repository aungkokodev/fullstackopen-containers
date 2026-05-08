import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return todos.map((todo) => (
    <Todo
      todo={todo}
      key={todo._id}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
    />
  ))
}

export default TodoList
