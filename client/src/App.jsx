import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/auth-components/LoginPage";
import RegisterPage from "./components/auth-components/RegisterPage";

const App = () => {
    const { user, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth && !user) {
        return <div className="w-full h-screen">Loading</div>;
    }

    return (
        <>
            <Routes>
                {/* <Route
                    path="/"
                    element={user ? <Dashboard /> : <LoginPage />}
                ></Route> */}
                <Route
                    path="/login"
                    element={
                        !user ? <LoginPage /> : <Navigate to={"/dashboard"} />
                    }
                ></Route>
                <Route
                    path="/register"
                    element={
                        !user ? (
                            <RegisterPage />
                        ) : (
                            <Navigate to={"/dashboard"} />
                        )
                    }
                ></Route>
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Navigate to={"/login"} />}
                ></Route>
                <Route path="/tasks"></Route>
                <Route path="/expenses"></Route>
            </Routes>
            <Toaster />
        </>
    );
};

export default App;
