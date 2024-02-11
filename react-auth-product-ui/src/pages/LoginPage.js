import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from "react-router-dom";
import { ForgotPasswordPage } from './ForgotPasswordPage';

export const LoginPage = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const { setToken } = useAuth();
    const navigate = useNavigate();
    function onLoginClicked() {
        fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: emailValue, password: passwordValue })
        }).then(res => res.json()).then(resp => { console.log(resp.token); setToken(resp.token); navigate("/") }).catch(e => console.log(e))
    }

    const handleForgetPwd = () => {
        navigate("/forgot-password");
    }

    const [googleOauthUrl, setGoogleOauthUrl] = useState("");
    useEffect(() => {
        try {
            let currentUrl = window.location.href;
            let oauthToken = currentUrl.split("token=")[1];
            if (oauthToken) {
                setToken(oauthToken);
                navigate("/products");
            }
        } catch (e) {
            console.log(e);
        }
        try {
            fetch("http://localhost:3001/auth/google/url", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    setGoogleOauthUrl(data.url);
                    console.log(data);
                }).catch(e => console.log(e))
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            <h3>Login</h3>

            <input type="text" placeholder='enter username' value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />

            <input type="password" placeholder='enter password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />

            <button type="submit" onClick={(e) => onLoginClicked(e)}>Login</button>

            <button type="submit" onClick={(e) => navigate("/signup")}>New user ? then signup</button>

            <button type="submit" onClick={(e) => handleForgetPwd()} >Forgot Password</button>

            <button type='submit' disabled={!googleOauthUrl} onClick={(e) => window.location.href = googleOauthUrl}>login with Google</button>
        </div>

    )
}