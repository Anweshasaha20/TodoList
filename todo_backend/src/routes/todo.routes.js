import { Router } from "express";
const todoRouter = Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//get all todo
todoRouter.get("/todos", async (req, res) => {
  try {
    const allTodos = await prisma.todo.findMany();
    res.json(allTodos);
  } catch (e) {
    console.error(e.message);
  }
});

//get a todo
todoRouter.get("/todo/:id", async (req, res) => {
  const id = parseInt(req.params.id); // Parse id from request parameters to int

  try {
    const todo = await prisma.todo.findUnique({
      where: { todoid: id }, // Specify the unique id
    });

    if (todo) {
      res.status(200).json(todo); // Send the unique record as response
    } else {
      res.status(404).send("Todo not found"); // Handle case where no record is found
    }
  } catch (e) {
    console.error(e.message); // Log any errors
    res.status(500).send("Server Error");
  }
});

// Define POST route for "/todos"
todoRouter.post("/todos", async (req, res) => {
  try {
    console.log(req.body.description); // Log the parsed request body

    // Save the data to the database
    const userdata = await prisma.todo.create({
      data: { description: JSON.stringify(req.body.description) },
    });

    console.log(userdata);

    // Return the description in the response
    res.status(201).json({
      message: "Todo created successfully",
      description: req.body.description,
    });
  } catch (e) {
    console.error(e.message); // Log the error message
    res.status(500).send("Server Error");
  }
});

//update a todo
todoRouter.put("/todos/:id", async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//delete a todo
todoRouter.delete("/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedata = await prisma.todo.delete({
      where: {
        todoid: id,
      },
    });
    res.json("data deleted successfully");
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

export default todoRouter;
