  import React from "react";
  import { slide as Menu } from "react-burger-menu";
  import "./navigationBar.css";

  export const NavigationBar = () => {
    return (
      <Menu>
        <a href="/">Todo App</a>

        <a href="/about">About</a>

        <a href="/statistics">Statistics</a>
      </Menu>
    );
  };
