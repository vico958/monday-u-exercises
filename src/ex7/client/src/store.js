import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import todoListSliceReducers from "./Slices/todoList/todoListSlice";
import callbackFunctionsReducers from "./Slices/CallbackFunctions/callbackFunctionsSlice";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  todoList:todoListSliceReducers,
  callbackFunctions:callbackFunctionsReducers,
});

export const store = configureStore({
  reducer: {
    allReducers
  },
  middleware: [thunkMiddleware],
  // preloadedState: {}
});
