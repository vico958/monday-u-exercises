import React from 'react';
import { useState, useEffect } from "react";
import { addItem } from '../../apiRequestsLib';
import styles from './addItem.module.css';
import PropTypes from "prop-types";

export const AddItem = ({callBackFunction}) => {
    const [isUploadItem, setIsUploadItem] = useState(false);
    const [task, setTask] = useState("");
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if(isUploadItem){
            setIsUploadItem(false);
            callBackFunction();
        }
        setTask("");
    }, [isUploadItem])

    const onKeyDownInput = (event) => {
      if (event.key === "Enter") {
        addItemFunction();
      }
    }

    const onChangeInput = (event) => {
        setTask(event.target.value);
        setInputValue(event.target.value);
    }

    const onClickSubmitButton = () => {
        addItemFunction();
    }

    const addItemFunction = async () => {
        try{
            const addItemWithDefaultIsCompeleteFalse = false;
            setInputValue("");
            await addItem(task, addItemWithDefaultIsCompeleteFalse);
            setIsUploadItem(true);
        } catch(error){
            throw error;
        }
    }

    return (
      <div className = {styles.add_item_div}>
        <input className = {styles.user_input} placeholder="Add your task"
        onChange = {onChangeInput} onKeyDown = {onKeyDownInput} value = {inputValue}/>
        <button className = {styles.button_submit} onClick = {onClickSubmitButton}>Submit</button>
        </div>
        );
    }

    AddItem.propTypes = {
        callBackFunction: PropTypes.func
      };