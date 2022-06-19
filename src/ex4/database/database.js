  import { writeFileSync, readFileSync, existsSync } from "fs";

  const dataFile = "./database/DB.json";

  export default class todosDatabase {
  
    getData = () => {
      try {
        const isDataExists = existsSync((dataFile));
        if (isDataExists) {
          const data = readFileSync(dataFile);
          if (data.length !== 0) {
            return JSON.parse(data);
          }
        }
        return [];
      } catch (error) {
        throw Error("Failed to get data");
      }
    };

    addData =  (dataToAdd) => {
      try {
        const data = this.getData();
        // this.isAlreadyInData(dataToAdd, data);
        if(data.includes(dataToAdd)) {
          throw Error("Already having this task");
      }
        data.push(dataToAdd);
        writeFileSync(dataFile, JSON.stringify(data));
      } catch (error) {
        throw Error("Failed to add data");
      }
    };

    deleteData = (index) => {
      const data = this.getData();
      if(this.isInRangeOfList(index, data.length)){
        throw Error("Index is not valid");
      }
      try {
        data.splice(index, 1);
        writeFileSync(dataFile, JSON.stringify(data));
        return "Deleted and saved";
      } catch (error) {
        throw Error("Failed to write to file edited data");
    }
    };

    deleteAllData = () => {
      try {
        writeFileSync(dataFile, "");
        return "Deleted all data";
      } catch(error) {
        throw Error("Failed to delete all data");
      }
    }

    isInRangeOfList(index, listLength) {
      return (index < 0 ||  index >= listLength)
  }

    // isAlreadyInData(newDataToEnter, data) {
    //   if(data.includes(newDataToEnter)) {
    //       throw Error("Already having this task");
    //   }
    // }
  }