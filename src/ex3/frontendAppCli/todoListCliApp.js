import { Command } from "commander"; 
import { ItemManager } from "../backendApp/itemManager.js";

const todoListProgram = new Command();
const todoListArr = new ItemManager();


todoListProgram
    .name("todo-list-app")
    .description("The best Todo list app")
    .version("1.0.0")

todoListProgram
    .command("get")
    .description("Get all todo list")
    .action(async () => {
        try {
            let i =0;
            const todoList = await todoListArr.getList();
            if(todoList.length !== 0) {
                todoList.forEach(item => {
                    console.log(item);
                });
            } else {
                console.log("There is no tasks in data");
            }
        } catch (error) {
            console.log(`${error.message}`);
        }
    });

todoListProgram
    .command("add")
    .description("Add tasks, if you add a list of items, its will be add from left to right, if one of the items on the way was already in the database the adding will be stop from his point and on.")
    .argument("<string>", "Task add")
    .action(async (value) => {
        try {
            await todoListArr.addItem(value);
            console.log("Add item");
        } catch(error) {
            console.log(error.message);
        }
    });

todoListProgram
    .command("delete")
    .description("Delete item with is index, index should be number from 0 and up to the size of the todo list-1")
    .argument("<number>", "Delte task index")
    .action(async (index) => {
        try{
            await todoListArr.deleteItem(index);
            console.log(`Deleted item with index ${index} worked`);
        } catch(error) {
            console.log(error.message);
        }
    });

todoListProgram
    .command("deleteAll")
    .description("Delete all items")
    .action(async() => {
        try {
            await todoListArr.deleteAllItems();
            console.log("Deleted all items");
        } catch(error) {
            console.log(error.message);
        }
    });

todoListProgram.parse();