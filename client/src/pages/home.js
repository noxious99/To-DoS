import React from "react";
import { useEffect, useState } from "react";
import "./navbar";
import "../style/basic.css";
import "../style/list.css";
import Navbar from "./navbar";
import TodoDetails from "./todoDetails";
import NoteForm from "./../components/noteForm";
import { useTodoContext } from "../context/useTodoContext";

const Home = () => {
  const {todos, dispatch} = useTodoContext()

  useEffect(() => {
    const fetch_todo = async () => {
      const response = await fetch("/list");
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'GET_TODOS', payload: json})
      }
    };
    fetch_todo();
  }, []);

  return (
    <div>
      <div class="container">
        <Navbar />
        <h1>To-Do'S</h1>
        <div>
          <NoteForm />
        </div>
      </div>
      <div class="list">
        {todos &&
          todos.map((todos) => <TodoDetails key={todos._id} todos={todos} />)}
      </div>
    </div>
  );
};

export default Home;
