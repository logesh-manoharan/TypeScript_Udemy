import React from "react";
import { useRef } from "react";

interface TodoDef {
    onAddTodo: (description: string) => void;
}

const Todo: React.FunctionComponent<TodoDef> = (props) => {

    const newTodoRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Desc : " + newTodoRef.current!.value);
        props.onAddTodo(newTodoRef.current!.value);
    }

    return (
        <form onSubmit={todoSubmitHandler}>
            <br /><br />
            <input type="text" id="todoDesc" placeholder="Todo Desc" ref={newTodoRef} />
            <br /><br />
            <button type="submit" className="button-primary">ADD TODO</button>
        </form>
    );
}

// import { useRef } from "react";

// const Todo: React.FunctionComponent = () => {
//     const inputRef = useRef<HTMLInputElement>(null);

//     const todoSubmitHandler = (event: React.FormEvent) => {
//         event.preventDefault();
//         const inputDesc = inputRef.current!.value;
//         console.log("Desc : " + inputDesc);
//     }

//     return (
//         <form onSubmit={todoSubmitHandler}>
//             <input type="text" id="todoDesc" placeholder="Todo Desc" ref={inputRef} />
//             <button type="submit">ADD TODO</button>
//         </form>
//     );
// }

export default Todo;
