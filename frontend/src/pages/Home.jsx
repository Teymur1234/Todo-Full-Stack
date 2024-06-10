import React from 'react'
import TodoList from '../components/TodoList/TodoList'
import TodoForm from '../components/TodoForm/TodoForm'

const Home = () => {
  return (
    <>
     <div style={{width:"36%",margin:"0 auto"}}>
      <TodoForm isEdit={false}/>
      <TodoList/>
     </div>
    </>
  )
}

export default Home
