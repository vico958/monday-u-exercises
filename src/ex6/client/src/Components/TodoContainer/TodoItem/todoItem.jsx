  import React from "react";
  import delete_icon from "../../Images/delete_icon.svg";
  import edit_icon from "../../Images/edit_icon.svg";
  import styles from "./todoItem.module.css";
  import { deleteItem, updateItemStatus, editItem } from "../../apiRequestsLib";
  import PropTypes from "prop-types";

  export const TodoItem = ({ callBackFunction, todo, errorCallBackFunction }) => {
    const { id, isCompleted, task } = todo;

    const onClickDeleteButton = async () => {
      await deleteItem(id, errorCallBackFunction);
      callBackFunction();
    };

    const onChangeCheckBox = async () => {
      await updateItemStatus(id, !isCompleted, errorCallBackFunction);
      callBackFunction();
    };

    const onClickEditItem = async () => {
      const newTask = window.prompt("Enter your new task");
      if (newTask) {
        await editItem(id, newTask, errorCallBackFunction);
        callBackFunction();
      }
    };

    return (
      <section>
        <div className={styles.list_item}>
          <input
            className={styles.list_item_checkbox_status}
            type="checkbox"
            onChange={onChangeCheckBox}
            checked={isCompleted}
          />
          <div className={styles.item_text_as_div} onClick={onClickEditItem}>
            {task}
          </div>
          <img
            className={styles.list_item_edit_button}
            src={edit_icon}
            onClick={onClickEditItem}
          />
          <img
            className={styles.list_item_delete_button}
            src={delete_icon}
            onClick={onClickDeleteButton}
          />
        </div>
      </section>
    );
  };

  TodoItem.propTypes = {
    callBackFunction: PropTypes.func,
    todo: PropTypes.shape({
      id: PropTypes.number,
      isCompleted: PropTypes.bool,
      task: PropTypes.string,
    }),
    errorCallBackFunction: PropTypes.func,
  };
