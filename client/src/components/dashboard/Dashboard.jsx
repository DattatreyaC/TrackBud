import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import Modal from "../misc/Modal";

const Dashboard = () => {
    const { user, logout, deleteAccount, isDeletingProfile, checkAuth } =
        useAuthStore();

    const [open, setOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <div className="relative">
                <div>Dashboard of {user.firstname}</div>

                <button
                    onClick={() => {
                        setOpen(true);
                        setIsLogout(true);
                    }}
                    className="border p-1"
                >
                    Logout
                </button>
                <button
                    onClick={() => {
                        setOpen(true);
                        setIsDelete(true);
                    }}
                    className="border ml-3 p-1"
                >
                    Delete Account
                </button>
            </div>

            <div
                className={`w-full h-screen p-1 bg-black/50 absolute top-0 left-0 place-content-center  ${
                    open ? "block" : "hidden"
                }`}
            >
                <Modal
                    open={open}
                    setOpen={setOpen}
                    isLogout={isLogout}
                    isDelete={isDelete}
                    setIsLogout={setIsLogout}
                    setIsDelete={setIsDelete}
                />
            </div>
        </>
    );
};

export default Dashboard;
