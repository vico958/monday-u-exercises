import React from "react";
import { Typography } from "@mui/material";
import { TodoContainer } from "../TodoContainer/TodoContainer/todoContainer";
import { useEffect } from "react";

export const TodoApp = () => {
  useEffect(() => {

    const keydownHandler = (e) => {
      if(e.key === "Enter" && e.ctrlKey){
        openNewTab();
      }
    }

    const openNewTab = () => {
      window.open("http://localhost:3000/");
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);
  return (
    <section>
      <Typography variant={"h1"}>Todo App</Typography>
      <TodoContainer />
    </section>
  );
};
