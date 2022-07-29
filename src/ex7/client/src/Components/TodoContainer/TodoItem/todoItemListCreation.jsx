import React from "react";
import delete_icon from "../../Images/delete_icon.svg";
import edit_icon from "../../Images/edit_icon.svg";
import styles from "./todoItemListCreation.module.css";
import { deleteItem, updateItemStatus, editItem } from "../../Api/apiRequestsLib";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { removeTodo, updateTodosStatus, updateTodosTask } from "../../../Slices/todoList/todoListSlice";
import uuid from 'react-uuid';

export const TodoItemListCreation = () => {
  const dispatch = useDispatch();
  const {todoList} = useSelector((state) => state.allReducers.todoList);
  const {errorCallbackFunction} = useSelector((state) => state.allReducers.callbackFunctions);
  const onClickDeleteButton = async (id) => {
    await deleteItem(id, errorCallbackFunction);
    dispatch(removeTodo(id));
  };
  
  const onChangeCheckBox = async (id, isCompleted) => {
    await updateItemStatus(id, !isCompleted, errorCallbackFunction);
    dispatch(updateTodosStatus(id));
  };
  
  const onClickEditItem = async (id) => {
    const newTask = window.prompt("Enter your new task");
    if (newTask) {
      const editedItem = await editItem(id, newTask, errorCallbackFunction);
      if(editedItem){
        dispatch(updateTodosTask(editedItem));
      }

    }
  };

  const makingTodoList = useMemo(() => {
    return todoList.map((todo) => (
<section key={uuid()}>
<div className={styles.list_item}>
  <input
    className={styles.list_item_checkbox_status}
    type="checkbox"
    onChange={() => {onChangeCheckBox(todo.id, todo.isCompleted)}}
    checked={todo.isCompleted}
  />
  <div className={styles.item_text_as_div} onClick={() => onClickEditItem(todo.id)}>
    {todo.task}
  </div>
  <img
    className={styles.list_item_edit_button}
    src={edit_icon}
    onClick={() => onClickEditItem(todo.id)}
  />
  <img
    className={styles.list_item_delete_button}
    src={delete_icon}
    onClick={() => onClickDeleteButton(todo.id)}
  />
</div>
</section>
    ));
  }, [todoList]);

  return makingTodoList
};
