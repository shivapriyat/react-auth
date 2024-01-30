import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const PleaseVerifyEmail = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        setTimeout(()=> {
            navigate("/");
        }, 5000)
    },[]);
    return (
        <>
        <h1>Thanks for signing up with the site</h1>
        <div>Please verify your email to access all features of site.</div>
        </>
    )
}