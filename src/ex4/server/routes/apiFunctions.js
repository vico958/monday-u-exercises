import ItemManager from '../services/item_manager.js';
const itemManger = new ItemManager();
export async function getAllTodoList(req, res, next){
    try{
        const listToReturn = await itemManger.getList();
        res.status(200).json(listToReturn);
    } catch(error){
        next(error);
    }
}

export async function createTodo(req, res, next){
    try{
        await itemManger.addItem(req.body.todo);
        res.status(200);
    } catch(error){
        next(error);
    }
}

export async function deleteAllTodo(req, res, next){
    try{
        await itemManger.deleteAllItems();
        res.status(200);
    } catch(error){
        next(error);
    }
}

export async function deleteTodo(req, res, next){
    try{
        await itemManger.deleteItem(req.body.id);
        res.status(200);
    } catch(error){
        next(error);
    }
}