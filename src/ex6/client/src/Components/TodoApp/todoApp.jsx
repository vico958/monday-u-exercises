  import React from 'react';
  import { Typography } from "@mui/material";
  import { TodoContainer } from '../TodoContainer/TodoContainer/todoContainer';

  export const TodoApp = () => {
      return(
          <section>
              <Typography variant={"h1"}>
                Todo App
              </Typography>
              <TodoContainer/>
      </section>
    );
  }