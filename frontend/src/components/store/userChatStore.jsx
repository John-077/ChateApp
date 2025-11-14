import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  allCOntacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selctedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnables: localStorage.getItem("isSoundEnables") === "true",

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async() => {
    set({ isUsersLoading: true });
    try {
        const res = await axiosInstance.get("/messages/contacts");
        set({ allContacts: res.data });
    } catch (error) {
        console.error( error.response?.data?.message);
        toast.error(error.response?.data?.message)
    } finally {
        set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async() => {
    set({ isUsersLoading: true });
    try {
        const res = await axiosInstance.get("/messages/chats");
        set({ chats: res.data });
    } catch (error) {
        console.error( error.response?.data?.message);
        toast.error(error.response?.data?.message)
    } finally {
        set({ isUsersLoading: false });
  }   },
  
}));

export default useAuthStore;
