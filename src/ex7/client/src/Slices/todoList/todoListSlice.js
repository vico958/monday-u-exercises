import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
  saveLastRemovedTodo : null,
  _copyTodoList:[]
}
export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      if(Array.isArray(action.payload)){
        state._copyTodoList = [...state._copyTodoList, ...action.payload];
      } else{
        state._copyTodoList = [...state._copyTodoList, action.payload];
      }
      state.todoList = state._copyTodoList;
    },
    removeTodo:(state, action) => {
      const newTodoList = state._copyTodoList.filter(item => {
        if(item.id === action.payload){
          state.saveLastRemovedTodo = item.task;
        } else{
          return item;
        }
      })
      state._copyTodoList = [...newTodoList];
      state.todoList = [...state._copyTodoList];
    },
    removeAllTodos:(state) => {
        state.todoList = [];
        state._copyTodoList = [];
    },
    loadAllTodos:(state, action) => {
      if(state.todoList.length === 0){
        state._copyTodoList = [...state._copyTodoList, ...action.payload];
        state.todoList = [...state._copyTodoList];
      }
    },
    updateTodosStatus:(state, action) => {
      const newTodoList = state._copyTodoList.filter((item) => {
        if(item.id === action.payload){
          item.isCompleted = !item.isCompleted;
        }
        return item;
      })
      state._copyTodoList = [...newTodoList];
      state.todoList = [...state._copyTodoList];
    },
    updateTodosTask:(state, action) => {
      const newTodoList = state._copyTodoList.filter((item) => {
        if(item.id === action.payload.id){
          item.task = action.payload.task;
          item.isCompleted = action.payload.isCompleted;
        }
        return item;
      })
      state._copyTodoList = [...newTodoList];
      state.todoList = [...state._copyTodoList];
    },
    updateLastRemovedTodoToNull:(state) => {
      state.saveLastRemovedTodo = null;
    },
    filteredTodoListByIsCompleted:(state, action) => {
      const newList = [];
      for (let i = 0; i < state._copyTodoList.length; i++) {
        if(state._copyTodoList[i].isCompleted === (action.payload)){
          newList.push(state._copyTodoList[i]);
        }
      }
      state.todoList = [...newList];
    },
    filteredTodoListBySearch:(state, action) => {
      const newList = [];
      const searchInputAsLowerCase = action.payload.toLowerCase();
      for (let i = 0; i < state._copyTodoList.length; i++) {
        const taskAsLowerCase = state._copyTodoList[i].task.toLowerCase();
        if(taskAsLowerCase.includes(searchInputAsLowerCase)){
          newList.push(state._copyTodoList[i]);
        }
      }
      state.todoList = [...newList];
    }
  }
})

export const { addTodo, removeTodo, removeAllTodos, loadAllTodos, updateTodosStatus, updateTodosTask,
updateLastRemovedTodoToNull, filteredTodoListByIsCompleted, filteredTodoListBySearch } = todoListSlice.actions

export default todoListSlice.reducer