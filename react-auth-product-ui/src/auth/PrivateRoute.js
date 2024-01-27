import React from "react";
import {Route, Navigate, Outlet} from "react-router-dom";
import { useAuth } from "./useAuth";
export const PrivateRoute =({children}) => {
const {user} = useAuth();
if(!user?.email) {
    return  <Navigate to="/login" />
}
return children;
}