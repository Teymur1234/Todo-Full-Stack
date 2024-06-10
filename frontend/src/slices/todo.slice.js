import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:"todo",
    initialState:{
        todos:[],
    },
    reducers:{
        setTodos:(state,action)=>{
            state.todos = action.payload
        },
        addTodo:(state,action)=>{
            state.todos.push(action.payload)
        },
        removeTodo:(state,action)=>{
            state.todos = state.todos.filter((todo)=>todo._id !== action.payload)
        },
        editTodo:(state,action)=>{
            const {_id,title} = action.payload;
            const todo = state.todos.find((todo)=>todo._id === _id)
            if (todo) {
                todo.title = title;
            }

        }
    }
})

export const {setTodos,addTodo,removeTodo,editTodo} = todoSlice.actions;
export default todoSlice.reducer
