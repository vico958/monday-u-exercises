    import React, { useState, useEffect } from 'react';
    import styles from './statistics.module.css';
    import { getItems } from '../apiRequestsLib';
    import { Typography } from "@mui/material";

    export const Statistics = () => {
        const [todoList, setTodoList] = useState([]);
        const [countFinishedTask, setCountFinishedTask] = useState(0);

        useEffect(() => {
            setingTodoList();
            finishedTaskAmount();
        }, [todoList])

        const setingTodoList = async () => {
            setTodoList(await getItems());
        }

        const finishedTaskAmount = () => {
            let count = 0;
            todoList.forEach(todo => {
                if(todo.isCompleted){
                    count++;
                }
            });
            setCountFinishedTask(count);
        }
        
        return(
            <section>
                <Typography variant = "h1" color = "purple">
                Statistics
                </Typography>
                <p className = {styles.text_statistics_page}>You have {todoList.length} tasks.</p>

                {countFinishedTask >= 1 ?
                <p className = {styles.text_statistics_page}>You finished {countFinishedTask} of {todoList.length} task already, good job!!!.</p>
                : <></>}

                {todoList.length >= 1 && countFinishedTask === 0 ?
                <div>
                    <p className = {styles.text_statistics_page}>You didnt finish any task until now.</p>
                    <p className = {styles.text_statistics_page}>What are you waiting for? stop coding and start working!</p>
                </div>
                : <></>}
        </section>
    );
    }