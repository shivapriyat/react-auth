import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordSuccess = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/login");
        }, 5000)
    }, []);
    return (
        <>
            <h1>Success</h1>
            <p>Password reset successful Please login with new password</p>
        </>
    )
}

const ResetPasswordFail = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/login");
        }, 5000)
    }, []);
    return (
        <>
            <h1>Uh Oh...</h1>
            <p>Something went wrong Password reset fail Please try again </p>
        </>
    )
}

export const ResetPasswordLandingPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    const { passwordResetCode } = useParams();

    const submitPwd = () => {
        try {
            fetch(`http://localhost:3001/auth/${passwordResetCode}/reset-password`, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({newPassword})
            }).then(res=> res.status === 200 ? setIsSuccess(true) : setIsFailure(true))
        } catch (error) {
            setIsFailure(true);
        }
    }
    if (isSuccess) {
        return <ResetPasswordSuccess />
    }
    else if(isFailure) {
        return <ResetPasswordFail />
    } else {
        return (
            <>
            <input type="password" placeholder="enter new password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>

            <input type="password" placeholder="confirm new password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>

            <button type="submit" disabled={!newPassword || !confirmPassword || newPassword!==confirmPassword}onClick={(e)=> submitPwd()} >Reset Password </button>
            </>
        )
    }
    
}