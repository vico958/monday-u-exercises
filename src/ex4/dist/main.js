class Main {
    constructor() {
        this.itemClient = new ItemClient()
    }

    init = async () => {
        const addItemButton = document.getElementById("list-item-submit");
        addItemButton.addEventListener("click", this.handleItem);
        const deleteAllButton = document.getElementById("delete-all-button");
        const taskInput = document.getElementById("list-item-input");
        deleteAllButton.addEventListener("click", this.deleteAll);
        taskInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                addItemButton.click();
            }});
        await this.renderItems(); // this will make it so that any time you refresh the page you'll see the items already in your todo list
    }
    
    handleItem = async () => {
        const taskInput = document.getElementById("list-item-input");
        await this.itemClient.addItem(taskInput.value);
        await this.renderItems();
        // implement
    }
    
    deleteItem = async item => {
        await this.itemClient.deleteItem(item);
        await this.renderItems();
        // implement
    }
    
    deleteAll = async () => {
        await this.itemClient.deleteAllItems();
        await this.renderItems();
    }
    renderItems = async () => {
        const list = document.getElementById("list");
        list.innerHTML = "";
        
        const items = await this.itemClient.getItems();
        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add('list-item');
            listItem.innerHTML = item;
            
            const listItemDeleteButton = this._createDeleteButton(item);
            listItem.appendChild(listItemDeleteButton);
            list.appendChild(listItem);
        })
    }
    
    _createDeleteButton = item => {
        const button = document.createElement("img");
        button.src = "./images/delete_icon.svg";
        button.classList.add('list-item-delete-button');
        button.addEventListener("click", _ => this.deleteItem(item));
        
        return button
    }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});