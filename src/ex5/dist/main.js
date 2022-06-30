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
        await this.renderItems();
    }
    
    handleItem = async () => {
        const taskInput = document.getElementById("list-item-input");
        const taskIsCompletedInitValue = false;
        await this.itemClient.addItem(taskInput.value, taskIsCompletedInitValue);
        await this.renderItems();
        taskInput.value = "";
    }
    
    deleteItem = async itemId => {
        await this.itemClient.deleteItem(itemId);
        await this.renderItems();
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
            listItem.appendChild(this._createCheckBoxButton(item));
            listItem.appendChild(this._createTextForListItem(item));
            listItem.appendChild(this._createEditButton(item));
            const listItemDeleteButton = this._createDeleteButton(item.id);
            listItem.appendChild(listItemDeleteButton);
            list.appendChild(listItem);
        })
    }

    editItem = async (item) => {
        const newTask = window.prompt("Enter your new task");
        if(newTask){
            await this.itemClient.editItem(item.id, newTask);
            await this.renderItems();
        }
    }
    
    _createDeleteButton = itemId => {
        const button = document.createElement("img");
        button.src = "./images/delete_icon.svg";
        button.classList.add('list-item-delete-button');
        button.addEventListener("click", _ => this.deleteItem(itemId));
        
        return button
    }
    _createCheckBoxButton = item => {
        const checkBoxItem = document.createElement("input");
        checkBoxItem.type = "checkbox";
        checkBoxItem.checked = item.isCompleted;
        checkBoxItem.classList.add('list-item-checkbox-status');
        checkBoxItem.addEventListener("click", _ => this._updateItemStatus(item, checkBoxItem));
        return checkBoxItem;
    }
    _updateItemStatus = async(item, checkBoxItem) => {
        item.isCompleted = !(item.isCompleted);
        const newStatus = item.isCompleted;
        checkBoxItem.checked = newStatus;
        await this.itemClient.updateItemStatus(item.id, newStatus);
    }
    _createTextForListItem = item => {
        const textItem = document.createElement("p");
        const text = document.createTextNode(item.task);
        textItem.classList.add('list-item-text');
        textItem.appendChild(text);

        return textItem;
    }
    _createEditButton = item => {
        const button = document.createElement("img");
        button.src = "./images/edit_icon.svg";
        button.classList.add('list-item-edit-button');
        button.addEventListener("click", _ => this.editItem(item));
        
        return button
    }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});