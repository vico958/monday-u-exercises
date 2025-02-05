// The ItemManager should go here. Remember that you have to export it.
import { ItemManagerValidator } from "./itemMangerValidator.js"; 
import PokemonClient from "../clients/pokemon_client.js";
import todosDatabase from "../../database/database.js";
import createError from "../../errorFile.js";
export default class ItemManager {
    constructor(){
        this.pokemonClient = new PokemonClient();
        this.validator = new ItemManagerValidator();
        this.database = new todosDatabase();
    }
    async addItem(item){
        if(this.validator.isInputBlank(item)) {
            throw createError("Item need to have something inside him!!!", 400);
        }
        try {
            let task = item;
            if (this.validator.isNumber(item)) {
                task = await this.pokemonClient.createPokemonToCatchMessage(item);
            } else { 
                const listToCatchAndIsValid = this.validator.isList(item);
                if (listToCatchAndIsValid !== false ) {
                    await this._addItemAsList(listToCatchAndIsValid);
                    return;
                }
            }
            this.database.addData(task);
        } catch(error) {
            throw (error);
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
