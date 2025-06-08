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

            // setEmail("");
            // setPassword("");
        }
    };

    return (
        <>
            <div className="w-full min-h-screen p-5 flex flex-col gap-7 justify-center">
                <h1 className="text-3xl font-semibold text-center">LOGIN</h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col gap-3"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-1 placeholder:italic"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-1 placeholder:italic"
                    />
                    <button
                        disabled={isLoggingIn}
                        type="submit"
                        className="border p-1.5 bg-slate-950 text-white cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center">
                    <p>New to TrackBud?</p>
                    <Link to={"/register"} className="text-blue-500">
                        Create an account
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
