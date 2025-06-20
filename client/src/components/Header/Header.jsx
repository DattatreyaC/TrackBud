import React, { useState } from "react";
import Modal from "../misc/Modal";
import { Link } from "react-router-dom";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    return (
        <header className="w-full absolute top-0 left-0 z-50 shadow-[0_3px_10px_black]">
            <div className="flex items-center justify-between px-5 py-4 bg-black">
                <Link
                    to={"/dashboard"}
                    className="text-white text-3xl font-vibur rotate-355 underline"
                >
                    TrackBud
                </Link>

                <div className="w-full flex items-center justify-end">
                    <button
                        onClick={() => {
                            setOpen(true);
                            setIsLogout(true);
                        }}
                        className="border py-1 px-3 text-sm bg-amber-600 text-white font-semibold rounded-sm"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => {
                            setOpen(true);
                            setIsDelete(true);
                        }}
                        className="border ml-3 py-1 px-3 text-sm bg-red-800 text-white font-semibold rounded-sm"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            <div
                className={`w-full h-screen p-1 bg-black/50 fixed top-0 left-0 flex items-center justify-center  ${
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
        </header>
    );
};

export default Header;
