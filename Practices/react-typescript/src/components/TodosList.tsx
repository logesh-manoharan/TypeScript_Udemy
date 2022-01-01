import React from 'react';

interface TodoDef {
    items: {
        id: string,
        description: string
    }[];
    onDeleteTodo: (todoId: string) => void; 
}

const todosList: React.FunctionComponent<TodoDef> = (props) => {
    const onDelete = (todoId: string) => {
        console.log("ID to delete : " + todoId);
        props.onDeleteTodo(todoId);
    }
    
    return (
        <ul>
            {props.items.map(todo => 
                <li key={todo.id}>
                    <span>{todo.description}</span>
                    <button type='button' className='button-success' onClick={onDelete.bind(null, todo.id)}>DELETE</button>
                </li>
            )}
        </ul>
    );
}

export default todosList;