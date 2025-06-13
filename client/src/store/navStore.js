import { create } from "zustand";

const useNavStore = create((set) => ({
    activeLink: 2,

    setActiveLink: (link) => {
        set({ activeLink: link });
    },
}));

export default useNavStore;
