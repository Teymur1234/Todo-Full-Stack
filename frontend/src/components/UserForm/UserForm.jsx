// Styles
import "./UserForm.css";

// React Hooks
import { useRef } from "react";
// Redux Hooks
import {useDispatch} from 'react-redux'
// Actions
import { setUser } from "../../slices/user.slice";
// Router Hooks
import { useNavigate } from "react-router";

const UserForm = ({isLogin}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const email = emailRef.current.value
      const password = passwordRef.current.value

      const response = await fetch(
        isLogin ? "/api/auth/login" : "/api/auth/signup",
        {
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({email,password}),
        }
      )
      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data))
        localStorage.setItem("user",JSON.stringify(data))
        navigate('/')
        if (isLogin) {
          alert("You are sucsessfully log in ")
        }else{
          alert("Account sucsessfully created")
        }

        emailRef.current.value= "";
        password.current.value = "";
      }
      if (!response.ok) {
        alert(`Error:${data.error}`);
      }
    } catch (error) {
      console.log("Fetch error:" + error);
    }
  }
  
  return (
    <div className="user-form">
      <form  onSubmit={handleSubmit}>
        <h2>{isLogin ? "Log in" : "Sign up"}</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" id="email" ref={emailRef} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
          ref={passwordRef}
            type="password"
            placeholder="Password"
            id="password"
          />
        </div>
        <button className="btn">{isLogin ? "Log in" : "Sign up"}</button>
      </form>
    </div>
  );
};

export default UserForm;
