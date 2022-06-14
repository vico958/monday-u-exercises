// Implement the `Main` class here

class Main{
    constructor(){}

        async init(){
            const taskInput = document.getElementById("list-item-input");
            const submitButton = document.getElementById("list-item-submit");
            document.getElementById("list-item-delete-all-button").addEventListener("click", this.onDeleteAllClick);
            // this.startingPInsert();
            submitButton.addEventListener("click", this.onAddTaskButton);
            taskInput.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    submitButton.click();
                }});
        }
        async onAddTaskButton(){
            const taskInput = document.getElementById("list-item-input");
            try {
                if (/^[0-9]+$/.test(taskInput.value)){
                    let pokemon = await pokemonClient.getSinglePokemonInfo(taskInput.value);
                    itemManager.addItem(pokemon);
                } else {
                    if (/^[0-9, ]+$/.test(taskInput.value)){
                        let listToCatch = taskInput.value.replaceAll(",",' ');
                        listToCatch = listToCatch.split(/[ ]+/);
                        let arrToCatch = [];
                        listToCatch.forEach(value => {
                            if (value !== ''){
                                arrToCatch.push(value);
                            }
                        })
                        try {
                            let pokemons = await pokemonClient.getListPokemonInfo(arrToCatch);
                            pokemons.forEach(pokemon => {
                                itemManager.addItem(pokemon);
                            })
                        } catch(error) {
                            if (error !== "Already having some or all of this task/s") {
                                itemManager.addItem(error);
                            } else {
                                alert(error);
                            }
                        }
                    } else {
                        itemManager.addItem(taskInput.value);
                    }
                }
                mainDomHelper.onAddTaskButton();
            } catch (error) {
                taskInput.value = "";
                alert (error);
            }
        }
        onDeleteAllClick(){
            mainDomHelper.onDeleteAll();
        }
    }

const main = new Main();
const itemManager = new ItemManager();
const mainDomHelper = new MainDomHelper();
const pokemonClient = new PokemonClient();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});