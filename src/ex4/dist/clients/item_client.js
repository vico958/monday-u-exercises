// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
class ItemClient{
    constructor(){
        this.backendApi = "http://localhost:3030";
    }
    async getItems(){
        const response = await axios.get(this.backendApi);
        return await response.data;
    }
    async addItem(todo){
        try{
            const response = await axios({
                method: 'post',
                url: this.backendApi,
                data:{'todo':todo}
            });
            return await response.data;
        } catch(error){
            const response = error.response.data;
            alert(`${response.error} and code is ${response.status}`);
        }
    }
    async deleteAllItems(){
        try{
            await axios.delete(this.backendApi);
        } catch(error){
            const response = error.response.data;
            alert(`${response.error} and code is ${response.status}`);
        }
    }
    async deleteItem(value){
        try{
            const itemArr = await this.getItems();
            const index = itemArr.indexOf(value);
            await axios.delete(`${this.backendApi}/${index}`, {data:{'id':index}});
        } catch(error){
            const response = error.response.data;
            alert(`${response.error} and code is ${response.status}`);
        }
    }
}

exports = {ItemClient};