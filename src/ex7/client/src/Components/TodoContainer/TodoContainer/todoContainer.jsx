import React from "react";
import { useCallback } from "react";
import styles from "./todoContainer.module.css";
import { getItems } from "../../Api/apiRequestsLib";
import { TodoItemListCreation } from "../TodoItem/todoItemListCreation";
import { AddItem } from "../AddItem/addItem";
import { loadAllTodos } from "../../../Slices/todoList/todoListSlice";
import { useDispatch } from "react-redux";
import { errorCallbackFunction } from "../../../Slices/CallbackFunctions/callbackFunctionsSlice";
import { Features } from "../Features/features";

export const TodoContainer = () => {
  const dispatch = useDispatch();
  const setingTodoList = useCallback(async () => {
    dispatch(loadAllTodos(await getItems()));
    dispatch(errorCallbackFunction(alertingWhenError));
  }, []);
  
  setingTodoList();

  const alertingWhenError = useCallback((error) => {
    const response = error.response.data;
    alert(`${response.error} and code is ${response.status}`);
  });

  return (
    <section>
      <AddItem/>
      <section className={styles.list}>
        <TodoItemListCreation/>
      </section>
      <Features/>
    </section>
  );
};
