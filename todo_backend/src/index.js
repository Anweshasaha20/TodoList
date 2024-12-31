import todoRouter from "./routes/todo.routes.js";
import express from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import cors from "cors";

const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true })); // req.body
app.use(cors()); // This will allow cross-origin requests
app.use(express.json());
app.use("/api/v1", todoRouter);

// Start the server
app.listen(1234, () => {
  console.log("Server is running on port 1234");
});
