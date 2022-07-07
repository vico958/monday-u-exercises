const ItemManager = require('../services/item_manager')
async function getAllTodoList(req, res, next){
    try{
        const listToReturn = await ItemManager.getList();
        res.status(200).send(JSON.stringify(listToReturn));
    } catch(error){
        next(error);
    }
}

async function createTodo(req, res, next){
    try{
        await ItemManager.addItem(req.body.todo, req.body.isCompleted);
        res.status(200);
        res.end();
    } catch(error){
        next(error);
    }
}

async function deleteAllTodo(req, res, next){
    try{
        await ItemManager.deleteAllItems();
        res.status(200);
        res.end();
    } catch(error){
        next(error);
    }
}

async function deleteTodo(req, res, next){
    try{
        await ItemManager.deleteItem(req.body.taskId);
        res.status(200);
        res.end();
    } catch(error){
        next(error);
    }
}

async function updateTodoStatus(req, res, next){
    try{
        await ItemManager.updateItemStatus(req.body.taskId, req.body.newStatus);
        res.status(200);
        res.end();
    } catch(error){
        next(error);
    }
}

async function updateTodoToNewTodo(req, res, next){
    try{
        const {taskId, newTask} = req.body;
        await ItemManager.updateTodoToNewTodo(taskId, newTask);
        res.status(200);
        res.end();
    } catch(error){
        next(error);
    }
}

module.exports = {
    getAllTodoList,
    createTodo,
    deleteAllTodo,
    deleteTodo,
    updateTodoStatus,
    updateTodoToNewTodo
}