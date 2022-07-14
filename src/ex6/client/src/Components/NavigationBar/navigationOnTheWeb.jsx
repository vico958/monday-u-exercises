import React from "react";
import { About } from "../About/about";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { TodoApp } from "../TodoApp/todoApp";
import { Statistics } from "../Statistics/statistics";

export const NavigationOnTheWeb = () => {
  return (
    <section>
      <Router>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </section>
  );
};
