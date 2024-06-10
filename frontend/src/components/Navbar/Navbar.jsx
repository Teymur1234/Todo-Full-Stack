// Styles
import "./Navbar.css";
// Link
import { Link} from "react-router-dom";
// Redux Hooks
import { useSelector ,useDispatch } from "react-redux";
// Actions
import { removeUser} from "../../slices/user.slice";
// Rouet Hooks
import {useNavigate } from "react-router";

const Navbar = () => {

  const user = useSelector(state=>state.user.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async() =>{
   try {
    const response = await fetch("api/auth/logout",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      }
    })
    const data = await response.json()
    
    if (response.ok) {
      dispatch(removeUser())

      navigate("/signup")
      // ve ya dispatch(setUser(null)) yaziriq
      localStorage.removeItem("user")
      alert(data.message)
    }
    if (!response.ok) {
      alert(data.error)
    }
   } catch (error) {
    console.log("Fetch error",error);
   }
  }

  return (
  <header className="header">
  <Link to="/">
    <h1 className="logo">TodoApp</h1>
  </Link>
  <nav>
    <ul className="menu">
      {user &&
        <li>
        <Link to="/signup" onClick={handleLogout}><button >
        Log out
      </button></Link>
      </li>
      }
       {!user &&
        <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </>
       }
    
    </ul>
  </nav>
  </header>
  );
};

export default Navbar;
