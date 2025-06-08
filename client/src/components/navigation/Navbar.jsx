import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../misc/Modal";

const Navbar = ({ menuOpen, setMenuOpen }) => {
    const [open, setOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-40 bg-[200,200,200,1] py-3 [backdrop-filter:blur(10px)] border-b border-b-white/25 shadow-2xl ">
            <div className="w-full h-max px-6 sm:px-10 md:px-15 lg:px-40 xl:px-60 2xl:px-80 flex items-center justify-between ">
                {/* <a
                    id="logo"
                    href="#home"
                    className="font-major text-3xl sm:text-4xl flex items-center gap-1 lg:p-1.5 lg:rounded lg:transition-colors lg:duration-300 lg:border lg:border-transparent lg:hover:border-white/30 lg:hover:bg-white/10 "
                >
                    <div className="bg-white flex items-center justify-center text-black font-bold p-0.5">
                        <span className="text-main-accent">D</span>C
                    </div>
                    <div
                        ref={logoRef}
                        className="text-[1rem] sm:text-[1.3rem] text-white"
                    >
                        <p className="logo-name">dattatreya</p>
                        <p className="logo-name">chakraborty</p>
                    </div>
                </a> */}

                {/* mobile menu */}
                <button
                    className={`w-7 h-5 relative z-40 flex items-center justify-center p-5 text-xl md:hidden ${
                        menuOpen ? "opacity-0" : "opacity-100"
                    } text-white`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open Menu"
                >
                    <i className="ri-menu-fill z-50"></i>
                </button>

                {/* desktop menu */}
                <div
                    id="links"
                    className="hidden md:flex items-center gap-8 border rounded-xl duration-300 transition-colors"
                >
                    <Link
                        to={"/dashboard"}
                        className="text-gray-200 hover:text-[#70ff70]  transition-colors ease-in-out py-2 px-2"
                    >
                        Home
                    </Link>

                    <Link
                        to={"/tasks"}
                        className="text-gray-200 hover:text-[#70ff70]  transition-colors ease-in-out py-2 px-2"
                    >
                        Tasks
                    </Link>

                    <Link
                        to={"/expenses"}
                        className="text-gray-200 hover:text-[#70ff70]  transition-colors ease-in-out py-2 px-2"
                    >
                        Expenses
                    </Link>
                </div>

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
        </nav>
    );
};

export default Navbar;
