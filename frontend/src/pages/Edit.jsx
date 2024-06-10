import React from 'react'
import TodoForm from '../components/TodoForm/TodoForm'

const Edit = () => {
  return (
    <>
    <div style={{width:"36%",margin:"0 auto"}}>

      <TodoForm isEdit={true}/>
      </div>
    </>
  )
}

export default Edit
