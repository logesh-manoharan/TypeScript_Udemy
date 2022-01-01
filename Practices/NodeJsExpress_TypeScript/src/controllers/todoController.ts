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
    TODOS.splice(indexToUpdate, 1);
    TODOS.splice(indexToUpdate, 0, {id: todoId, text: newTodoText} as Todo);

    res.status(200).json({ message: "Updated Successfully !!", updatedTodos: TODOS });
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id; 

    TODOS.filter((todo) => {
        return todo.id !== todoId;
    });

    res.status(200).json({ message: "Deleted Succesfully", afterDelete: TODOS});
}