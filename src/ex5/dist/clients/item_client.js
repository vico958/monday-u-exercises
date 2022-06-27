class ItemClient{
    constructor(){
        this.backendApi = "http://localhost:3030";
    }
    async getItems(){
        const response = await axios({
            method: 'get',
            url: `${this.backendApi}/get-all-items`
        });
        return await response.data;
    }
    async addItem(todo, todoIsCompletedInitValue){
        try{
            await axios({
                method: 'post',
                url: `${this.backendApi}/make-task`,
                data:{'todo':todo, 'isCompleted': todoIsCompletedInitValue}
            });
        } catch(error){
            this._errorCatchAlertClient(error);
        }
    }
    async deleteAllItems(){
        try{
            await axios({
            method: 'delete',
            url: `${this.backendApi}/delete-all-tasks`
            });
        } catch(error){
            this._errorCatchAlertClient(error);
        }
    }
    async deleteItem(taskId){
        try{
            const newUrl = `${this.backendApi}/delete-task`;
            await axios({
                method: 'delete',
                url:newUrl,
                data:{'taskId':taskId}
            });
        } catch(error){
            this._errorCatchAlertClient(error);
        }
    }
    async updateItemStatus(taskId, newStatus){
        try{
            await axios({
                method: 'post',
                url: `${this.backendApi}/update-task-status`,
                data:{'taskId':taskId, 'newStatus':newStatus}
            });
        } catch(error){
            this._errorCatchAlertClient(error);
        }
    }
    async editItem(taskId, newTask){
        try{
            await axios({
                method:'post',
                url:`${this.backendApi}/update-task-to-new-task`,
                data:{'taskId':taskId, 'newTask':newTask}
            });
        } catch(error){
            this._errorCatchAlertClient(error);
        }
    }
    _errorCatchAlertClient(error){
        const response = error.response.data;
        alert(`${response.error} and code is ${response.status}`);
    }
}