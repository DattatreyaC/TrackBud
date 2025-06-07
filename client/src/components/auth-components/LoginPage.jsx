import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const LoginPage = () => {
    const { login, isLoggingIn } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        if (!email || !password) {
            return toast.error("Fill all fields");
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm() === true) {
            login(email, password);

            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border"
                />
                <button disabled={isLoggingIn} type="submit">
                    Login
                </button>
            </form>
            <p>New to TrackBud?</p>
            <Link to={"/register"}>Create an account</Link>
        </>
    );
};

export default LoginPage;
