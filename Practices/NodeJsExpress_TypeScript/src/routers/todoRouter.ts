import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController";


const todoRouter = Router();

todoRouter.post("/", createTodo);

todoRouter.get("/", getTodos);

todoRouter.patch("/:id", updateTodo);

todoRouter.delete("/:id", deleteTodo);

export default todoRouter;