import React, { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const [username, setUsername] = useState("");

    const {setToken} = useAuth();
    const navigate = useNavigate();
    function onSignupClicked() {
        fetch("http://localhost:3001/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
         body: JSON.stringify({email: emailValue, password: passwordValue, confirmPassword: confirmPasswordValue, username: username})}).then(res=> res.json()).then(resp=> {console.log(resp.token); setToken(resp.token); navigate("/")}).catch(e=> console.log(e))
    }
    
    return (
        <div>
        <h3>Signup</h3>
       
        <input type="text" placeholder='enter username' value={username}  onChange={(e)=> setUsername(e.target.value)} />

            <input type="text" placeholder='enter email' value={emailValue}  onChange={(e)=> setEmailValue(e.target.value)} />

            <input type="password" placeholder='enter password' value={passwordValue}  onChange={(e)=> setPasswordValue(e.target.value)} />

            <input type="password" placeholder='confirm password' value={confirmPasswordValue}  onChange={(e)=> setConfirmPasswordValue(e.target.value)} />

            <button type="submit" onClick={(e)=>onSignupClicked(e)}>Signup</button>

            <button type="submit" onClick={(e)=> navigate("/login")}>Already existing user ? then login</button>

            </div>
       
    )
}