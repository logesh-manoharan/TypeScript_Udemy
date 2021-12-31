import React from "react";
import { useRef } from "react";

const Todo: React.FunctionComponent = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const inputDesc = inputRef.current!.value;
        console.log("Desc : " + inputDesc);
    }

    return (
        <form onSubmit={todoSubmitHandler}>
            <input type="text" id="todoDesc" placeholder="Todo Desc" ref={inputRef} />
            <button type="submit">ADD TODO</button>
        </form>
    );
}

export default Todo;
