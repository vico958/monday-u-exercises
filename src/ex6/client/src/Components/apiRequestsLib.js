import axios from "axios";

const apiUrl = "http://localhost:3030"
export async function getItems(errorCallBackFunction){
    try{
        const response = await axios({
            method: 'get',
            url: `${apiUrl}/get-all-items`
        });
        return await response.data;
    } catch(error){
        errorCallBackFunction(error);
    }
}
export async function addItem(todo, todoIsCompletedInitValue, errorCallBackFunction){
    try{
        await axios({
            method: 'post',
            url: `${apiUrl}/make-task`,
            data:{'todo':todo, 'isCompleted': todoIsCompletedInitValue}
        });
    } catch(error){
        console.log(error);
        errorCallBackFunction(error);
    }
}
export async function deleteItem(taskId, errorCallBackFunction){
    try{
        const newUrl = `${apiUrl}/delete-task`;
        await axios({
            method: 'delete',
            url:newUrl,
            data:{'taskId':taskId}
        });
    } catch(error){
        errorCallBackFunction(error);
    }
}
export async function editItem(taskId, newTask, errorCallBackFunction){
    try{
        await axios({
            method:'post',
            url:`${apiUrl}/update-task-to-new-task`,
            data:{'taskId':taskId, 'newTask':newTask}
        });
    } catch(error){
        errorCallBackFunction(error);
    }
}
export async function updateItemStatus(taskId, newStatus, errorCallBackFunction){
    try{
        await axios({
            method: 'post',
            url: `${apiUrl}/update-task-status`,
            data:{'taskId':taskId, 'newStatus':newStatus}
        });
    } catch(error){
        errorCallBackFunction(error);
    }
}
export async function deleteAllItems(errorCallBackFunction){
    try{
        await axios({
        method: 'delete',
        url: `${apiUrl}/delete-all-tasks`
        });
    } catch(error){
        errorCallBackFunction(error);
    }
}