// Styles
import "./TodoList.css";
// Link
import { Link } from "react-router-dom";
// React Hooks
import { useEffect } from "react";
// Actions
import { setTodos } from "../../slices/todo.slice";
// Redux Hooks
import { useDispatch, useSelector } from "react-redux";
const TodoList = () => {
  const dispatch = useDispatch()
  const todos =  useSelector((state)=>state.todos.todos)

  const getAllTodos = async () =>{
    try {
      const response =await fetch("/api/todos")
      const data = await response.json()
      if (response.ok) {
        dispatch(setTodos(data))
      }
      if (!response.ok) {
          alert(data.error)
      }
    } catch (error) {
      console.log("Fetch error", error);}}
  useEffect(()=>{
    getAllTodos()
  }, []);
  return (
    <div className="todoList">
      <ul>
        { todos.map(todo=>{
          return (
            <li key={todo._id}>
            <span>{todo.title}</span>
            <div className="todoActions">
              <Link>
                <button className="btn">Edit</button>
              </Link>
              <button  className="btn">
                Delete
              </button>
            </div>
          </li>
          )
        })}

      </ul>
    </div>
  );
};

export default TodoList;
