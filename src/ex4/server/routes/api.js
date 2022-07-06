// Define your endpoints here (this is your "controller file")
import express from "express";
import { getAllTodoList, createTodo, deleteAllTodo, deleteTodo } from "./apiFunctions.js";
const itemRouter = express.Router();
itemRouter.post("/", createTodo);
itemRouter.get("/", getAllTodoList);
itemRouter.delete("/", deleteAllTodo);
itemRouter.delete("/:id", deleteTodo);


export default itemRouter;