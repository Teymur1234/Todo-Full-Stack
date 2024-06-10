// Styles
import "./TodoForm.css";

// React Hooks
import  {useRef} from "react"
// Router Hooks
import {useParams} from "react-router"
// Redux Hooks
import {useDispatch} from "react-redux"
// Actions
import {editTodo, addTodo} from '../../slices/todo.slice'

const TodoForm = ({ isEdit }) => {
  const dispatch = useDispatch();
  const todoRef = useRef(); 
  const {id} = useParams()

  const handleSubmit = async (event)=>{
  event.preventDefault();
  const title = todoRef.current.value
  console.log(title);
    try {
      const response =await fetch(isEdit ? `/api/todos/${id}` : "/api/todos",{
        method:isEdit? "PATCH" : "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({title}),
      })
      const data = await response.json()
      if (response.ok) {
        if (isEdit) {
          dispatch(editTodo(data))
        }else{
          dispatch(addTodo(data))
        }
      }
      if (!response.ok) {
        alert(data.error)
      }
    } catch (error) {
      console.log(`Fetch error`,error);
    }
  }

  return (
    <div className="todoForm">
      <form onSubmit={handleSubmit}>
        <input
          ref={todoRef}
          id="input"
          type="text"
          placeholder={isEdit ? "Edit todo" : "Add todo"}
        />
        <button type="submit" id="add" className="btn">
          {isEdit ? "Edit todo" : "Add todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
