import React from 'react';
import './App.css';
import TodoList from './components/TodosList';

const App: React.FunctionComponent = ()  => {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
