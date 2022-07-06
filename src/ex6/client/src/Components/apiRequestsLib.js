const apiUrl = "http://localhost:3030"
export async function getItems(){
    try{
        const fetchApi = await fetch(`${apiUrl}/get-all-items`);
        const jsonApi = await fetchApi.json();
        return jsonApi;
    } catch(error){
        throw (error);
    }
}
export async function addItem(todo, todoIsCompletedInitValue){
    const data = JSON.stringify({'todo':todo, 'isCompleted': todoIsCompletedInitValue});
    try{
        const url = `${apiUrl}/make-task`;
        await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body:data
        });
    } catch(error){
        throw (error);
    }
}
export async function deleteItem(taskId){
    try{
        const newUrl = `${apiUrl}/delete-task`;
        const data = JSON.stringify({'taskId':taskId});
        await fetch(newUrl, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body:data
        });
    } catch(error){
        throw (error);
    }
}
export async function editItem(taskId, newTask){
    try{
        const url = `${apiUrl}/update-task-to-new-task`;
        const data = JSON.stringify({'taskId':taskId, 'newTask':newTask});
        await fetch(url, {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:data
        });
    } catch(error){
        throw (error);
    }
}
export async function updateItemStatus(taskId, newStatus){
    try{
        const url = `${apiUrl}/update-task-status`;
        const data = JSON.stringify({'taskId':taskId, 'newStatus':newStatus});
        await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body:data
        });
    } catch(error){
        throw (error);
    }
}
export async function deleteAllItems(){
    try{
        const url = `${apiUrl}/delete-all-tasks`;
        await fetch(url, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        });
    } catch(error){
        throw (error);
    }
}