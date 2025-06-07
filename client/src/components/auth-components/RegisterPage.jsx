import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const RegisterPage = () => {
    const { register, isRegistering } = useAuthStore();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        if (!firstname || !lastname || !email || !password) {
            return toast.error("Fill all fields");
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm() === true) {
            register(firstname, lastname, email, password);

            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="border"
                />
                <input
                    type="text"
                    placeholder="Lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="border"
                />
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
                <button type="submit">Login</button>
            </form>
            <p>Already have an account?</p>
            <Link to={"/login"}>Login here</Link>
        </>
    );
};

export default RegisterPage;
