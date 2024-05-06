const TodoDetails = ({todos}) => {

    return (
        <div className="todo-details">
            <div className="title-box"> <h4>{todos.title}</h4> </div>
            <p>{todos.body}</p>
        </div>
    )
}

export default TodoDetails