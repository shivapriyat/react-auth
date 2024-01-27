import React, { useEffect, useState } from "react";

export const useAuth = () => {
    /* working code
    const [token,setTokenInternal] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    const setToken = (newToken)=> {
        localStorage.setItem("token", newToken);
        setTokenInternal(newToken);
    }
    return { token,setToken };*/

    const [token,setTokenInternal] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    const setToken = (newToken)=> {
        localStorage.setItem("token", newToken);
        setTokenInternal(newToken);
    }
    //setupuser
    const getPayloadFromToken = ()=> {
        if (token) {
            let encodedPayload = token.split(".")[1];
            let userdata = JSON.parse(atob(encodedPayload));
            return userdata;
        }
        return null;
    }
    const [user,setUser] = useState(()=>getPayloadFromToken());
    useEffect(()=> {
        
            setUser(getPayloadFromToken());
        
    }, [token]);
    return { token,setToken,user };
}