import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
export const VerifyEmailSuccess = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        setTimeout(()=> {
            navigate("/products");
        }, 5000)
    },[]);
    return (
        <>
        <h1>email verified success Redirecting to products</h1>
        </>
    )
}
export const VerifyEmailFail = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        setTimeout(()=> {
            navigate("/signup");
        }, 5000)
    },[]);
    return (
        <>
        <h1>email verification faied Redirecting to signup...</h1>
        </>
    )
}
export const VerifyEmailLanding = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const {verificationString} = useParams();
    const {setToken} = useAuth();
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:3001/auth/verify-mail`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({verificationString})
        }).then(res => 
            {
            if(res.status === 200) {
                setIsLoading(false);
                setIsEmailVerified(true);
               
            } else {
                setIsLoading(false);
                setIsEmailVerified(false);
            }
            return res.json()
        }
            ).then(resp => 
            {if(resp.token) 
                setToken(resp.token)})
    }, [])

    return(
        <>
        {isLoading ? <div>Loading Data...</div> : null}
        {!isLoading && isEmailVerified ? <VerifyEmailSuccess /> : null }
        {!isLoading && !isEmailVerified ? <VerifyEmailFail /> : null }

        </>
    )

}
