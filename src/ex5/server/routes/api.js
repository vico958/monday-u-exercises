const express = require('express');
const { getAllTodoList, createTodo, deleteAllTodo, deleteTodo, updateTodoStatus, updateTodoToNewTodo } = require('./apiFunctions');
const itemRouter = express.Router();
itemRouter.post("/make-task", createTodo);
itemRouter.get("/get-all-items", getAllTodoList);
itemRouter.delete("/delete-all-tasks", deleteAllTodo);
itemRouter.delete("/delete-task", deleteTodo);
itemRouter.post('/update-task-status', updateTodoStatus);
itemRouter.post('/update-task-to-new-task', updateTodoToNewTodo);


module.exports = itemRouter;