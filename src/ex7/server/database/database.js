const createHttpError = require('../errorFile')
const { Todo } = require('./models');
class todosDatabase {

  getTodoListData = async () => {
    try {
      const data = await Todo.findAll();
      return data;
    } catch (error) {
      throw createHttpError("Failed to get data", 500);
    }
  };
  addData = async (task, isCompleted) => {
    await this._checkIfDataIsAlreadyInDatabaseAndIfYesThrowError(task);
    try {
      return await Todo.create({task, isCompleted});
    } catch (error) {
      throw createHttpError("Failed to add data", 500);
    }
  };
  deleteData = async (taskId) => {
    try {
      return await Todo.destroy({where:{id:taskId}});
    } catch (error) {
      throw createHttpError("Failed to delete data", 500);
  }
  };
  deleteAllData = async () => {
    try {
      return await Todo.truncate();
    } catch(error) {
      throw createHttpError("Failed to delete all data", 500);
    }
  };
  updateDataStatus = async (taskId, newStatus) => {
    try{
      return await Todo.update({isCompleted:newStatus},
        {where:{id:taskId}});
    } catch(error){
      throw createHttpError("Failed to change status on task", 500);
    }
  }
  updateTodoToNewTodo = async (taskId, newTask) => {
    const isCompleted = false;
    await this._checkIfDataIsAlreadyInDatabaseAndIfYesThrowError(newTask);
    try{
      await Todo.update({task:newTask, isCompleted},
        {where:{id:taskId}});
      return await Todo.findOne({where:{id:taskId}});
    } catch(error){
      throw createHttpError("Failed to change task", 500);
    }
  }
  _checkIfDataIsAlreadyInDatabaseAndIfYesThrowError = async (dataToCheck) => {
    if(await Todo.findOne({where:{task:dataToCheck}})){
      throw createHttpError("Already having this task", 400);
    }
  }
}

module.exports = todosDatabase;