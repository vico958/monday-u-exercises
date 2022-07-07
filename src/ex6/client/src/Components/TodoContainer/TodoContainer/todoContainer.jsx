    import React from 'react';
    import { useState, useMemo, useEffect, useCallback } from "react";
    import styles from './todoContainer.module.css';
    import { getItems, deleteAllItems } from '../../apiRequestsLib';
    import { TodoItem } from '../TodoItem/todoItem';
    import { AddItem } from '../AddItem/addItem';

    export const TodoContainer = () => {
        const [todoList, setTodoList] = useState([]);

        useEffect(() => {
            setingTodoList();
        }, [])

        const setingTodoList = useCallback(async () => {
            setTodoList(await getItems());
        }, [])

        const onClickdeleteAllItems = async () => {
            await deleteAllItems();
            setTodoList(await getItems());
        }

        const alertingWhenError = useCallback((error) => {
            const response = error.response.data;
            alert(`${response.error} and code is ${response.status}`);
        });

        const taskList = useMemo(() => {
            return todoList.map((todo) => (<TodoItem key={todo.id} callBackFunction={setingTodoList} errorCallBackFunction={alertingWhenError}
                todo={todo} />))
        }, [todoList]);

        return (
            <section>
                <AddItem callBackFunction={setingTodoList} errorCallBackFunction={alertingWhenError} />
                <section className={styles.list}>
                    {taskList}
                </section>
                {todoList.length >= 1 &&
                    <button className={styles.delete_all_items_button} onClick={onClickdeleteAllItems}>
                        Delete All</button>}
            </section>
        );
    }