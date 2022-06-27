const createHttpError = require('../errorFile')
const { Todo } = require('./models');
class todosDatabase {

  getData = async () => {
    try {
      const data = await Todo.findAll();
      return data;
    } catch (error) {
      throw createHttpError("Failed to get data", 500);
    }
  };
  addData = async (dataToAdd, isCompleted) => {
    await this._checkIfDataIsAlreadyInDatabaseAndIfYesThrowError(dataToAdd);
    try {
      await Todo.create({task:dataToAdd, isCompleted:isCompleted, createdAt: new Date(), updatedAt: new Date()});
      return true;
    } catch (error) {
      throw createHttpError("Failed to add data", 500);
    }
  };
  deleteData = async (taskId) => {
    try {
      await Todo.destroy({where:{id:taskId}});
    } catch (error) {
      throw createHttpError("Failed to delete data", 500);
  }
  };
  deleteAllData = async () => {
    try {
      await Todo.truncate();
    } catch(error) {
      throw createHttpError("Failed to delete all data", 500);
    }
  };
  updateDataStatus = async (taskId, newStatus) => {
    try{
      const task = await Todo.findOne({where:{id:taskId}});
      await task.update({isCompleted:newStatus, updatedAt: new Date()});
    } catch(error){
      throw createHttpError("Failed to change status on task", 500);
    }
  }
  updateTodoToNewTodo = async (taskId, newTask) => {
    const isCompleted = false;
    await this._checkIfDataIsAlreadyInDatabaseAndIfYesThrowError(newTask);
    try{
      const task = await Todo.findOne({where:{id:taskId}});
      await task.update({task:newTask, isCompleted:isCompleted, updatedAt: new Date()});
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