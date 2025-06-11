import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full bg-[rgba(10,10,10,0.1)] backdrop-blur-xl z-50 flex flex-col gap-10 font-space-grotesk text-xl items-center justify-center transition-all duration-500 ease-in-out
                    ${
                        menuOpen
                            ? "h-screen opacity-100 pointer-events-auto"
                            : "h-0 opacity-0 pointer-events-none"
                    }
                `}
        >
            <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 left-10 text-white text-4xl focus:outline-none"
                aria-label="Close Menu"
            >
                &times;
            </button>

            <Link
                to={"/dashboard"}
                className={`text-2xl font-semibold text-white text-shadow-[2.5px_2.5px_2.5px_black] my-4 transform transition-transform duration-300  p-2
                    ${
                        menuOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                    }
                    `}
                onClick={() => setMenuOpen(false)}
            >
                Home
            </Link>

            <Link
                to={"/tasks"}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold text-white text-shadow-[2.5px_2.5px_2.5px_black] my-4 transform transition-transform duration-300  p-2
                    ${
                        menuOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                    }
                    `}
            >
                Tasks
            </Link>

            <Link
                to={"/expenses"}
                className={`text-2xl font-semibold text-white text-shadow-[2.5px_2.5px_2.5px_black] my-4 transform transition-transform duration-300  p-2
                    ${
                        menuOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                    }
                    `}
                onClick={() => setMenuOpen(false)}
            >
                Expenses
            </Link>
        </div>
    );
};

export default MobileMenu;
