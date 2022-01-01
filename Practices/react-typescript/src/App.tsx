import React from 'react';
import './App.css';
import TodoList from './components/TodosList';
import Todo from './components/Todo';
import { useState } from 'react';

const App: React.FunctionComponent = ()  => {
  const [todoList, setTodos] = useState<{id: string, description: string}[]>([]);
  // const todoList = [{id: Math.random().toString(), description: "First ToDo"}];

  const addTodoHandler = (text: string) => {
    setTodos(prevTodo => [...prevTodo, {
      id: Math.random().toString(),
      description: text
    }])
  };

  const deleteTodoHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter((todo) => {
        return todo.id !== todoId
      })
    })
  };

  return (
    <div className="App">
      <Todo onAddTodo={addTodoHandler} />
      <TodoList items={todoList} onDeleteTodo={deleteTodoHandler}/>
    </div>
  );
}

export default App;
