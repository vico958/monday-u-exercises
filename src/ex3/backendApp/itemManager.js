import { ItemManagerValidator } from "./itemMangerValidator.js"; 
import { PokemonClient } from "./pokemonClient.js";
import { todosDatabase } from "../database/database.js";

export class ItemManager {
    constructor(){
        this.pokemonClient = new PokemonClient();
        this.validator = new ItemManagerValidator();
        this.database = new todosDatabase();
    }
    async addItem(item){
        if(this.validator.isInputBlank(item)) {
            throw Error("Item need to have something inside him!!!");
        }
        try {
            let task = item;
            if (this.validator.isNumber(item)) {
                task = await this.pokemonClient.createSinglePokemonToCatchMessage(item);
            } else { 
                const listToCatchAndIsValid = this.validator.isList(item);
                if (listToCatchAndIsValid !== false ) {
                    await this._addItemAsList(listToCatchAndIsValid);
                    return;
                }
            }
            this.database.addData(task);
        } catch(error) {
            throw Error(error.message);
        }
    }

    async _addItemAsList(listToCatch) {
        const taskList = await this.pokemonClient.createListPokemonToCatchMessage(listToCatch);
        taskList.forEach((task) => this.database.addData(task));
    }
    async deleteItem(itemIndex){
        return this.database.deleteData(itemIndex)
    }
    async getList(){
        return this.database.getData();
    }
    async deleteAllItems(){
        return this.database.deleteAllData();
    }
}
