import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { text, id: undefined, complete: false };
    fetch(window.location.origin + '/api/todo', {
      method: 'post',
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(response => {
        setTodos(response);
      });
  };

  return (
    <div className="app">
      <h1>Systemutviklerskolen todo-app</h1> 
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <AddTodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;