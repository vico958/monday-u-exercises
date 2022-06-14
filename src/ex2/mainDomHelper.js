
class MainDomHelper {
    onAddTaskButton(){
        const taskInput = document.getElementById("list-item-input");
        const listOfTasks = itemManager.getList();
        try{
            const taskList = document.querySelector("ul");
            taskList.innerHTML = "";
            listOfTasks.forEach(value => {
                let liTag = document.createElement("li");
                let deleteImage = document.createElement("img");
                liTag.classList.add("list-item");
                deleteImage.src = "images/delete_icon.svg";
                deleteImage.classList.add("list-item-delete-button");
                deleteImage.addEventListener("click", (arg) => this.onDeleteFunction(value, liTag, arg));
                liTag.innerHTML = value;
                liTag.value = value;
                liTag.appendChild(deleteImage);
                taskList.appendChild(liTag);
            })
        } catch (error) {
            alert(error);
        }
        taskInput.value="";
    }
    onDeleteFunction(value, liTag, arg){
        arg.stopPropagation();
        liTag.remove();
        itemManager.deleteItem(value);
    }
    onDeleteAll(){
        const taskInput = document.getElementById("list-item-input");
        const taskList = document.querySelector("ul");
        taskList.innerHTML = "";
        itemManager.deleteAllItems();
        taskInput.value = "";
    }
}