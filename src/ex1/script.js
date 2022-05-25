let listOfTasks = [];
let pendingTaskCount = 0;
function onAddTaskButton(){
    const task = document.getElementById("todoTaskInput");
    if(task.value.length === 0){
        alert("Your trying to enter a task empty");
    }
    else{
        const taskList = document.querySelector("ul");
        let liTag = document.createElement("li");
        let deleteImage = document.createElement("img");
        liTag.classList.add("task");
        deleteImage.src = "Images/free-trash-icon-347-thumb.png";
        deleteImage.classList.add("taskImage");
        let taskInput = task.value
        liTag.addEventListener("click", () => onClickTask(taskInput));
        deleteImage.addEventListener("click", (arg) => onDeleteTask(liTag, arg))
        liTag.innerHTML = task.value;
        liTag.appendChild(deleteImage);
        taskList.appendChild(liTag);
        task.value="";
        pendingTaskCount++;
        displyPendingTasks();
    }
}

function onClickTask(task){
    alert(`i been clicked : ${task}`);
}

function onDeleteTask(liTag, arg){
    arg.stopPropagation();
    liTag.remove();
    pendingTaskCount--;
    displyPendingTasks();
}

function displyPendingTasks(){
    const pendingP = document.getElementById("pendingParagraph");
    if(pendingTaskCount === 0){
        pendingP.textContent = "You have 0 pending tasks";
    }
    else{
        pendingP.textContent = `you have ${pendingTaskCount} pending tasks`;
    }
}

function onClearButton(){
    const ulTasks = document.querySelector("ul");
    ulTasks.innerHTML = " ";
    pendingTaskCount = 0;
    displyPendingTasks();
}
