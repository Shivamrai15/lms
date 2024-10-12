import { create } from "zustand";

interface UseCertificateProps {
    certificateId: string;
    isOpen : boolean;
    onOpen : (certificateId: string)=>void;
    onClose : ()=>void;
}

export const useCertificate = create<UseCertificateProps>((set)=>({
    certificateId : "",
    isOpen : false,
    onOpen : ( certificateId: string )=>set({ certificateId, isOpen: true }),
    onClose : ()=>set({certificateId : "", isOpen: false})
}))