import React from "react";
import { useEffect} from "react";
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
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h1 className="home-title">To-Do'S</h1>
    <div className="container">
      <div className="content">
        <div className="left">
          <NoteForm />
        </div>
        <div className="right">
          <div className="list">
            {todos &&
              todos.map((todo) => <TodoDetails key={todo._id} todos={todo} />)}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};



export default Home;
