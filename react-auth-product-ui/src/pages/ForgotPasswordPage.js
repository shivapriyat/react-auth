import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const ForgotPasswordPage = () => {

    const [emailValue, setEmailValue] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const sendResetPwdEmail = () => {
        console.log("send reset pwd by emai")
        try {
        fetch(`http://localhost:3001/auth/forgot-password/${emailValue}`,{
            method: "PUT"
        }).then(res => {
            if(res.status === 200) {
                setIsSuccess(true);
            }
            else {
                setError(res);
            }
        }).catch( e=> {
            setError(e);
        }) }
        catch(err) {
            setError(err);
        }
    }
    return isSuccess ? (
        <div>
            <h1>Success</h1>
            <p>Password reset link is set to ur email Please check... </p>
            {setTimeout(()=> {navigate("/login")}, 5000)}
        </div>
    ) : (<div>
        <h1>Forgot Password</h1>
        <p>Please provide your email to send the reset password link</p>
        {error ? (<h1 className="notice">{error}</h1>) : null}
        <input type="email" placeholder="enter your email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
        <button type="submit" disabled = {!emailValue} onClick={e=>sendResetPwdEmail()}>Send Reset Email</button>
    </div>)
}