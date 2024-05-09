import React from "react";
import { useEffect, useState } from "react";
import "../style/basic.css";
import "../style/list.css";
import TodoDetails from "./todoDetails";
import NoteForm from "./../components/noteForm";
import { useTodoContext } from "../context/useTodoContext";
import { useAuthContext } from "../context/useAuthContext";

const Profile = () => {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch_todo = async () => {
      const response = await fetch("/api/todos/list", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_TODOS", payload: json });
      }
    };
    if (user) {
      fetch_todo();
    }
  }, [dispatch, user]);

  return (
    <div className="container">
      <div className="profile">
        <div>{user.email}</div>
      </div>
      <div className="form">
        <NoteForm />
        {error}
      </div>
      <div className="list">
        {todos &&
          todos.map((todo) => <TodoDetails key={todo._id} todos={todo} />)}
      </div>
    </div>
  );
};

export default Profile;
