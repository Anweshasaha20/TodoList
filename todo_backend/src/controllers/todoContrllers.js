import asyncHandler from "express-async-handler";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all todos
export const getAllTodo = asyncHandler(async (req, res) => {
  const allTodos = await prisma.todo.findMany();
  res.json(allTodos);
});

//get a todo by id
export const getTodoById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id); // Parse id from request parameters to int
  const todo = await prisma.todo.findUnique({
    where: { todoid: id }, // Specify the unique id
  });

  if (todo) {
    res.status(200).json(todo); // Send the unique record as response
  } else {
    res.status(404).send("Todo not found"); // Handle case where no record is found
  }
});

// Create a new todo
export const postTodo = asyncHandler(async (req, res) => {
  const userdata = await prisma.todo.create({
    data: { description: req.body.description },
  });

  res.status(201).json({
    message: "Todo created successfully",
    description: userdata.description,
    todoid: userdata.todoid,
  });
});

//update a todo
export const updateTodo = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const description = req.body.description;

  const updatedata = await prisma.todo.update({
    where: {
      todoid: id,
    },
    data: {
      description: description,
    },
  });

  res.json(updatedata);
});

//delete
export const deleteTodo = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.todo.delete({
    where: {
      todoid: id,
    },
  });

  res.json("Data deleted successfully");
});
