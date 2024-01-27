import React from "react";
import { useAuth } from "../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";

export const Navmenu = () => {
    const navigate = useNavigate();
    const onLogoutClicked = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login")
    }
    const {user,setToken} = useAuth();
    return(
        <div>
        <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/products">Products</Link>
    </nav>
    { localStorage.getItem("token") ? 
        <button style={{float:"right"}} type="submit" onClick={(e) => onLogoutClicked()}>Logout</button>
     : null }
     </div>
    )
}