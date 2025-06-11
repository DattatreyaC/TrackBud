import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/auth-components/LoginPage";
import RegisterPage from "./components/auth-components/RegisterPage";
import Navbar from "./components/navigation/Navbar";
import MobileMenu from "./components/navigation/MobileMenu";
import Tasks from "./components/task-components/Tasks";

const App = () => {
    const { user, checkAuth, isCheckingAuth } = useAuthStore();

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth && !user) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                Loading
            </div>
        );
    }

    return (
        <>
            {user && <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
            {user && (
                <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            )}
            <Routes>
                <Route
                    path="/"
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
                    element={user ? <Dashboard /> : <Navigate to={"/"} />}
                ></Route>

                <Route
                    path="/tasks"
                    element={user ? <Tasks /> : <Navigate to={"/"} />}
                ></Route>

                <Route path="/expenses"></Route>

                <Route
                    path="*"
                    element={<Navigate to={user ? "/dashboard" : "/"} />}
                ></Route>
            </Routes>
            <Toaster />
        </>
    );
};

export default App;
