import { Router } from "express";
const todoRouter = Router();

import {
  getAllTodo,
  getTodoById,
  postTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoContrllers.js";

// Get all todos
todoRouter.get("/todos", getAllTodo);

// Get a single todo
todoRouter.get("/todo/:id", getTodoById);

// Create a new todo
todoRouter.post("/todos", postTodo);

// Update a todo
todoRouter.put("/todos/:id", updateTodo);

// Delete a todo
todoRouter.delete("/todos/:id", deleteTodo);

export default todoRouter;
