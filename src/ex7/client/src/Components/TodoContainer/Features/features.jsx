import React from "react";
import { useCallback, useState, useEffect } from "react";
import styles from "./features.module.css";
import { deleteAllItems, addItem } from "../../Api/apiRequestsLib";
import { removeAllTodos } from "../../../Slices/todoList/todoListSlice";
import { addTodo, updateLastRemovedTodoToNull } from "../../../Slices/todoList/todoListSlice";
import { useDispatch, useSelector } from "react-redux";
import { filteredTodoListBySearch, filteredTodoListByIsCompleted } from "../../../Slices/todoList/todoListSlice";

export const Features = () => {
  const dispatch = useDispatch();
  const {saveLastRemovedTodo} = useSelector((state) => state.allReducers.todoList);
  const [inputSearchValue, setInputSearchValue] = useState("");
  
  useEffect(() => {

    const keydownHandler = (e) => {
        if(e.ctrlKey){
            switch(e.key) {
                case "x":
                    onClickdeleteAllItems();
                  break;
                case "y":
                    onClickRestoreLastRemovedTodo();
                  break;
                case "q":
                    onClickShowAll();
                    break;
                case "c":
                    onClickShowOnlyDoneTodo();
                    break;
                case "b":
                    onClickShowOnlyLeftTodo();
                    break;
                default:
              }
        }
    }

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  const onClickdeleteAllItems = useCallback(async () => {
    await deleteAllItems();
    dispatch(removeAllTodos());
    dispatch(updateLastRemovedTodoToNull());
    resetSearchInput();
}, []);

  const onClickRestoreLastRemovedTodo = useCallback(async () => {
    if(saveLastRemovedTodo !== null){
        dispatch(addTodo(await addItem(saveLastRemovedTodo)));
        dispatch(updateLastRemovedTodoToNull());
        resetSearchInput();
    }
  });

  const onChageSearchBar = (event) => {
    setInputSearchValue(event.target.value);
    dispatch(filteredTodoListBySearch(event.target.value));
  };

  const onClickShowOnlyDoneTodo = () => {
    const isCompleted = true;
    dispatch(filteredTodoListByIsCompleted(isCompleted));
  }

  const onClickShowOnlyLeftTodo = () => {
    const isCompleted = false;
    dispatch(filteredTodoListByIsCompleted(isCompleted));
  }

  const onClickShowAll = () => {
    dispatch(filteredTodoListBySearch(""));
  }

  const onKeyDownSearch = (event) => {
    if (event.key === "Enter") {
        setInputSearchValue("");
        dispatch(filteredTodoListBySearch(event.target.value));
    }
  };

  const resetSearchInput = () => {
    setInputSearchValue("");
  }

  return (
    <section>
      <button
        className={styles.delete_all_items_button}
        onClick={onClickdeleteAllItems}
      >
        Delete All
      </button>
      {saveLastRemovedTodo !== null && (
      <button
        className={styles.restore_last_deleted_todo_button}
        onClick={onClickRestoreLastRemovedTodo}
      >
        Restore Last Deleted Todo
      </button>)}
      <button 
      className={styles.show_only_done_todo_button}
      onClick={onClickShowOnlyDoneTodo}>
        Show Only Done
      </button>
      <button 
      className={styles.show_only_left_todo_button}
      onClick={onClickShowOnlyLeftTodo}>
        Show Only left
      </button>
      <button 
      className={styles.show_all_todo_button}
      onClick={onClickShowAll}>
        Show All
      </button>
      <input placeholder="Search" className={styles.search_input}
      onChange={onChageSearchBar}
      onKeyDown={onKeyDownSearch}
      value={inputSearchValue}/>
    </section>
  );
};
