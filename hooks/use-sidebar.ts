import { create } from "zustand";

interface UseSidebarProps {
    isOpen : boolean;
    onOpen : ()=>void;
    onClose : ()=>void; 
}

export const useSidebar = create<UseSidebarProps>((set)=>({
    isOpen : false,
    onOpen : ()=>set({isOpen: true}),
    onClose : ()=>set({isOpen: false})
}));