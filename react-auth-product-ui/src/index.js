import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products";
import { PrivateRoute } from "./auth/PrivateRoute";
import { useAuth } from "./auth/useAuth";
import { Navmenu } from "./pages/Navmenu";
import { PleaseVerifyEmail } from "./pages/PleaseVerifyEmail";
import { VerifyEmailLanding } from "./pages/VerifyEmailLanding";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordLandingPage } from "./pages/ResetPasswordLandingPage";



let rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<BrowserRouter>
   <Navmenu />
    <Routes>
        <Route path="/" element={<App />} > </Route>
        <Route path="/login" element={<LoginPage />} > </Route>
        <Route path="/signup" element={<SignupPage />} > </Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} > </Route>
        <Route path="/reset-password/:passwordResetCode" element={<ResetPasswordLandingPage />} > </Route>
        <Route path="/please-verify-email" element={<PleaseVerifyEmail />} > </Route>
        <Route path="/verify-user/:verificationString" element={<VerifyEmailLanding />} > </Route>
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} > </Route>
    </Routes>
</BrowserRouter>
);