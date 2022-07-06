import { writeFileSync, readFileSync, existsSync } from "fs";
import createError from "../errorFile.js";
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
      throw createError("Failed to get data", 500);
    }
  };
  addData = (dataToAdd) => {
    const data = this.getData();
    if(data.includes(dataToAdd)) {
      throw createError("Already having this task", 409);
    }
    try {
      data.push(dataToAdd);
      writeFileSync(dataFile, JSON.stringify(data));
    } catch (error) {
      throw createError("Failed to add data", 500);
    }
  };
  deleteData = (index) => {
    const data = this.getData();
    if(this.isInRangeOfList(index, data.length)){
      throw createError("Index is not valid", 416);
    }
    try {
      data.splice(index, 1);
      writeFileSync(dataFile, JSON.stringify(data));
      return "Deleted and saved";
    } catch (error) {
      throw createError("Failed to write to file edited data", 500);
  }
  };
  deleteAllData = () => {
    try {
      writeFileSync(dataFile, "");
      return "Deleted all data";
    } catch(error) {
      throw createError("Failed to delete all data", 500);
    }
  }
  isInRangeOfList(index, listLength) {
    return (index < 0 ||  index >= listLength)
}
}