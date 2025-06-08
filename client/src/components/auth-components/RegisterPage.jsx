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

            // setFirstname("");
            // setLastname("");
            // setEmail("");
            // setPassword("");
        }
    };

    return (
        <>
            <div className="w-full min-h-screen p-5 flex flex-col gap-7 justify-center">
                <h1 className="text-3xl font-semibold text-center">REGISTER</h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col gap-3"
                >
                    <input
                        type="text"
                        placeholder="Firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="border p-1 placeholder:italic"
                    />
                    <input
                        type="text"
                        placeholder="Lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="border p-1 placeholder:italic"
                    />
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
                        type="submit"
                        className="border p-1.5 bg-slate-950 text-white cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>

                <div className="text-center">
                    <p>Already have an account?</p>
                    <Link to={"/login"} className="text-blue-500">
                        Login here
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
