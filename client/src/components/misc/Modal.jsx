import React from "react";
import useAuthStore from "../../store/authStore";

const Modal = ({
    open,
    setOpen,
    isLogout,
    isDelete,
    setIsDelete,
    setIsLogout,
}) => {
    const { logout, deleteAccount } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    const handleDelete = () => {
        deleteAccount();
    };

    const handleClick = () => {
        if (isDelete === true) {
            handleDelete();
        }
        if (isLogout === true) {
            handleLogout();
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center  rounded-sm p-5 bg-gray-600">
                <h2 className="text-white text-xl w-full">
                    {isLogout ? "Are you sure you want to logout?" : null}
                    {isDelete
                        ? "Are you sure you want to delete your account?"
                        : null}
                </h2>
                {isDelete && (
                    <p className=" w-full text-gray-400">
                        ⚠This action can't be undone.
                    </p>
                )}
                <div className="w-full h-max flex gap-5 pt-3 place-content-end">
                    <button
                        onClick={() => {
                            setOpen(false);
                            setIsDelete(false);
                            setIsLogout(false);
                        }}
                        className="bg-gray-500 py-1 px-5 rounded-md text-white border border-white/50 cursor-pointer"
                    >
                        No
                    </button>

                    <button
                        onClick={handleClick}
                        className="bg-black text-white border border-white/50 py-1 px-5 rounded-md cursor-pointer"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </>
    );
};

export default Modal;
