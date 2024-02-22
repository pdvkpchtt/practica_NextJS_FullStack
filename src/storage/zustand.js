import { create } from "zustand";

const useStore = create((set) => ({
  contactsComp: {},
  contactsCompState: (data) =>
    set((state) => ({
      contactsComp: data,
    })),
}));
export default useStore;
