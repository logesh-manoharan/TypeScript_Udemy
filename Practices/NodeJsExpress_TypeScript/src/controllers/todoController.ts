import { RequestHandler } from 'express';
import { Todo } from '../models/todoModel';


const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const todoText = (req.body as Todo).text;
    const newTodo: Todo = {id: Math.random().toString(), text: todoText};

    TODOS.push(newTodo);

    res.status(201).json({message: "New Todo Created !!", createdTodo: newTodo});
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ todos: TODOS });
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const newTodoText = (req.body as Todo).text;
    const indexToUpdate = TODOS.findIndex(todo => todo.id === todoId);
    TODOS[indexToUpdate].text = newTodoText;

    console.log("After Update : " + JSON.stringify(TODOS));

    res.status(200).json({ message: "Updated Successfully !!", updatedTodos: TODOS });
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id; 

    const deleteIndex = TODOS.findIndex(todo => todo.id === todoId);

    TODOS.splice(deleteIndex, 1);
    console.log("TODOS LIST : " + JSON.stringify(TODOS));

    res.status(200).json({ message: "Deleted Succesfully", afterDelete: TODOS});
}