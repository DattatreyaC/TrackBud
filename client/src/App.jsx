import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/auth-components/LoginPage";
import RegisterPage from "./components/auth-components/RegisterPage";
import Navbar from "./components/navigation/Navbar";
import Tasks from "./components/task-components/Tasks";
import Header from "./components/Header/Header";
import Transactions from "./components/transaction-components/Transactions";

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
        <div className="w-full min-h-screen flex justify-center">
            <div className="w-full max-w-[1024px] h-screen relative border-r-2 border-l-2 bg-white">
                {user && <Navbar />}
                {user && <Header />}

                <Routes>
                    <Route
                        path="/"
                        element={
                            !user ? (
                                <LoginPage />
                            ) : (
                                <Navigate to={"/dashboard"} />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !user ? (
                                <RegisterPage />
                            ) : (
                                <Navigate to={"/dashboard"} />
                            )
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard /> : <Navigate to={"/"} />}
                    />
                    <Route
                        path="/tasks"
                        element={user ? <Tasks /> : <Navigate to={"/"} />}
                    />
                    <Route
                        path="/transactions"
                        element={
                            user ? <Transactions /> : <Navigate to={"/"} />
                        }
                    />

                    <Route
                        path="*"
                        element={<Navigate to={user ? "/dashboard" : "/"} />}
                    />
                </Routes>
                <Toaster position="top-right" />
            </div>
        </div>
    );
};

export default App;
