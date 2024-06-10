import { Routes,Route } from "react-router";

// pages
import Home from "./pages/Home"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Edit from "./pages/Edit";

// components
import Navbar from "./components/Navbar/Navbar";
// Actions
import { setUser } from "./slices/user.slice";
// Redux Hooks
import { useDispatch } from "react-redux";

const App =()=> {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"))

if (user) {
  dispatch(setUser(user))
}
  return (
 <>
 <Navbar/>
 <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<SignUp/>} />
  <Route path="/edit" element={<Edit/>}/>
  
 </Routes>
 </>
  );
}

export default App;
