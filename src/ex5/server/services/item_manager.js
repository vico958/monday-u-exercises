const ItemManagerValidator = require('./itemMangerValidator');
const PokemonClient = require('../clients/pokemon_client');
const todosDatabase = require('../../database/database');
const createHttpError = require('../../errorFile');
class ItemManager {
    constructor(){
        this.pokemonClient = new PokemonClient();
        this.validator = new ItemManagerValidator();
        this.database = new todosDatabase();
    }
    async addItem(item, isCompleted){
        if(this.validator.isInputBlank(item)) {
            throw createHttpError("Item need to have something inside him!!!", 400);
        }
        try {
            let task = item;
            if (this.validator.isNumber(item)) {
                task = await this.pokemonClient.createPokemonToCatchMessage(item);
            } else { 
                const listToCatchAndIsValid = this.validator.isList(item);
                if (listToCatchAndIsValid !== false ) {
                    await this._addItemAsList(listToCatchAndIsValid, isCompleted);
                    return;
                }
            }
            await this.database.addData(task, isCompleted);
        } catch(error) {
            throw (error);
        }
    }
    async _addItemAsList(listToCatch, isCompleted) {
        const taskList = await this.pokemonClient.createListPokemonToCatchMessage(listToCatch);
        for (let i = 0; i < taskList.length; i++) {
            await this.database.addData(taskList[i], isCompleted);
          }
        // taskList.forEach(async (task) => {
        //     await this.database.addData(task, isCompleted);
        // });
    }
    async deleteItem(taskId){
        await this.database.deleteData(taskId)
    }
    async getList(){
        return await this.database.getData();
    }
    async deleteAllItems(){
        await this.database.deleteAllData();
    }
    async updateItemStatus(taskId, newStatus){
        await this.database.updateDataStatus(taskId, newStatus);
    }
    async updateTodoToNewTodo(taskId, newTask){
        await this.database.updateTodoToNewTodo(taskId, newTask);
    }
}

module.exports = new ItemManager()