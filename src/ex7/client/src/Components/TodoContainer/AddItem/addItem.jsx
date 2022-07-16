import React from "react";
import { useState } from "react";
import { addItem } from "../../Api/apiRequestsLib";
import styles from "./addItem.module.css";
import PropTypes from "prop-types";
import { addTodo } from "../../../Slices/todoList/todoListSlice";
import { useDispatch, useSelector } from "react-redux";

export const AddItem = () => {
  const [task, setTask] = useState("");
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const {errorCallbackFunction } = useSelector((state) => state.allReducers.callbackFunctions);

  const onKeyDownInput = (event) => {
    if (event.key === "Enter") {
      addItemFunction();
    }
  };

  const onChangeInput = (event) => {
    setTask(event.target.value);
    setInputValue(event.target.value);
  };

  const onClickSubmitButton = () => {
    addItemFunction();
  };

  const addItemFunction = async () => {
    try {
      const addItemWithDefaultIsCompeleteFalse = false;
      setInputValue("");
      setTask("");
      const returnedItem = await addItem(
        task,
        addItemWithDefaultIsCompeleteFalse,
        errorCallbackFunction
      );
      if (returnedItem) {
        dispatch(addTodo(returnedItem));
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.add_item_div}>
      <input
        className={styles.user_input}
        placeholder="Add your task"
        onChange={onChangeInput}
        onKeyDown={onKeyDownInput}
        value={inputValue}
      />
      <button className={styles.button_submit} onClick={onClickSubmitButton}>
        Submit
      </button>
    </div>
  );
};

AddItem.propTypes = {
  callBackFunction: PropTypes.func,
  errorCallBackFunction: PropTypes.func,
};
