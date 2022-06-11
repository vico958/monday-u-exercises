let pendingTaskCount = 0;

const taskInput = document.getElementById("todoTaskInput");
const clearButton = document.getElementById("clearButtonId");

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("addTaskButtonId").click();
    }});

if(pendingTaskCount === 0){
    startingPInsert();
    displyPendingTasks();
}

function startingPInsert(){
    const startingP = document.createElement("p");
    startingP.classList.add("startingP");
    startingP.innerHTML = "Start To Arrange Your Tasks!";
    const divTodoTasksListContainer = document.querySelector("div.todoTasksListContainer");
    divTodoTasksListContainer.insertBefore(startingP, divTodoTasksListContainer.firstChild);
    clearButton.disabled = true;
}

function onAddTaskButton(){
    if(taskInput.value.length === 0){
        alert("Your trying to enter a task empty");
    }
    else{
        clearButton.disabled = false;
        const startingP = document.querySelector("p.startingP");
        if(pendingTaskCount === 0){
            startingP.remove();
        }
        const taskList = document.querySelector("ul");
        let liTag = document.createElement("li");
        let deleteImage = document.createElement("img");
        liTag.classList.add("task");
        deleteImage.src = "Images/free-trash-icon-347-thumb.png";
        deleteImage.classList.add("taskImage");
        let tempTaskInput = taskInput.value
        liTag.addEventListener("click", () => onClickTask(tempTaskInput));
        deleteImage.addEventListener("click", (arg) => onDeleteTask(liTag, arg))
        liTag.innerHTML = taskInput.value;
        liTag.value = taskInput.value;
        liTag.appendChild(deleteImage);
        taskList.appendChild(liTag);
        taskInput.value="";
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
    if(pendingTaskCount === 0){
        startingPInsert();
    }
    taskInput.value = "";
}

function displyPendingTasks(){
    const pendingP = document.getElementById("pendingParagraph");
    pendingP.textContent = `You have ${pendingTaskCount} pending tasks`;
}

function onClearButton(){
    const ulTasks = document.querySelector("ul");
    ulTasks.innerHTML = " ";
    pendingTaskCount = 0;
    displyPendingTasks();
    startingPInsert();
    taskInput.value = "";
}
