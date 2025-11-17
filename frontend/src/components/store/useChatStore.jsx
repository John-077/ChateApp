import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useChatStore = create((set, get) => ({
  allCOntacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      
      set({ allContacts: res.data.filteredUsers });
      console.log(res.data);
      
    } catch (error) {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      // console.log(res.data.chatPartners); 
      
      set({ chats: res.data.chatPartners });
    } catch (error) {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));

export { useChatStore };
