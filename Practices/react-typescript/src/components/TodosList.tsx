import React from 'react';
import Todo from './Todo';

const todosList: React.FunctionComponent = () => {
    const todoList = [{id: Math.random().toString(), description: "First ToDo"}];

    return (
        <ul>
            <Todo />
            {todoList.map(todo => <li key={todo.id}>{todo.description}</li>)}
        </ul>
    );
}

export default todosList;