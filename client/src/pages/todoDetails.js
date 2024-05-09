import { useTodoContext } from "../context/useTodoContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../context/useAuthContext";

const TodoDetails = ({ todos }) => {
  const { dispatch } = useTodoContext();
  const {user} = useAuthContext();

  const handleClick = async () => {

    const response = await fetch(`/api/todos/list/${todos._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      alert("post deleted!!");
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };
  return (
    <div className="todo-details">
      <div className="title-box">
        <h4>{todos.title}</h4>
        <button className='delete-button' onClick={handleClick}>delete</button> 
      </div>
      <p>{todos.body}</p>
      <br></br>
      <p>{formatDistanceToNow(new Date(todos.createdAt), {addSuffix: true})}</p>
      
    </div>
  );
};

export default TodoDetails;
