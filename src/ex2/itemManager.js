
class ItemManager{
    constructor(){
        this.itemMangerArr = [];
    }
    addItem(item){
        if(item === ""){
            throw "Must have a value eneterd";
        }else {
            if(this.itemMangerArr.includes(item)){
                throw "Already having some or all of this task/s";
            } else {
                this.itemMangerArr.push(item);
            }
        }
    }
    deleteItem(item){
        this.itemMangerArr = this.itemMangerArr.filter((value) => item !== value);
    }
    getList(){
        return this.itemMangerArr;
    }
    deleteAllItems(){
        this.itemMangerArr = [];
    }
}
