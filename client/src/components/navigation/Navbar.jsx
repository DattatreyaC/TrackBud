import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../misc/Modal";
import useNavStore from "../../store/navStore";

const Navbar = ({ menuOpen, setMenuOpen }) => {
    const { activeLink, setActiveLink } = useNavStore();

    // const [activeLink, setActiveLink] = useState(2);

    const handleNavLinkClick = (id) => {
        setActiveLink(id);
    };

    return (
        <nav className="absolute bottom-0 left-0 w-full z-40 bg-black py-3 shadow-[0_-3px_10px_black] ">
            {/* h-max px-6 sm:px-10 md:px-15 lg:px-40 xl:px-60 2xl:px-80 flex items-center justify-betwee */}
            <div className="w-full ">
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

                {/* mobile menu
                <button
                    className={`w-7 h-5 relative z-40 flex items-center justify-center p-5 text-xl md:hidden ${
                        menuOpen ? "opacity-0" : "opacity-100"
                    } text-white`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open Menu"
                >
                    <i className="ri-menu-fill z-50"></i>
                </button> */}

                {/* desktop menu */}
                <div
                    id="links"
                    className="w-full flex items-center justify-evenly gap-8 rounded-xl duration-300 transition-colors"
                >
                    <Link
                        id="transactions"
                        to={"/expenses"}
                        onClick={() => handleNavLinkClick(1)}
                        className="text-gray-200 hover:text-[#70ff70]  transition-colors ease-in-out py-2 px-2 size-10 flex items-center justify-center rounded-full text-xl flex-col"
                    >
                        {activeLink === 1 ? (
                            <i className="ri-wallet-3-fill"></i>
                        ) : (
                            <i className="ri-wallet-3-line"></i>
                        )}

                        <p
                            className={`${
                                activeLink === 1 ? "text-[1rem]" : "text-sm"
                            } `}
                        >
                            Transactions
                        </p>
                    </Link>

                    <Link
                        id="home"
                        to={"/dashboard"}
                        onClick={() => handleNavLinkClick(2)}
                        className="text-gray-200 hover:text-[#70ff70]  transition-colors ease-in-out py-2 px-2 size-10 flex items-center justify-center rounded-full text-xl flex-col"
                    >
                        {/* {console.log(activeLink)} */}
                        {activeLink === 2 ? (
                            <i className="ri-home-9-fill"></i>
                        ) : (
                            <i className="ri-home-2-line"></i>
                        )}

                        <p
                            className={`${
                                activeLink === 2 ? "text-[1rem]" : "text-sm"
                            } `}
                        >
                            Home
                        </p>
                    </Link>

                    <Link
                        id="tasks"
                        to={"/tasks"}
                        onClick={() => handleNavLinkClick(3)}
                        className="text-gray-200 hover:text-[#70ff70]  transition-colors ease-in-out py-2 px-2 size-10 flex items-center justify-center rounded-full text-xl flex-col"
                    >
                        {activeLink === 3 ? (
                            <i className="ri-todo-fill"></i>
                        ) : (
                            <i className="ri-todo-line"></i>
                        )}

                        <p
                            className={`${
                                activeLink === 3 ? "text-[1rem]" : "text-sm"
                            } `}
                        >
                            Tasks
                        </p>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
