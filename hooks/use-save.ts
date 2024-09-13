import { create } from "zustand";

interface UseSaveInterface {
    isSaving : boolean;
    setIsSaving : ( value: boolean )=>void;
}

export const useSave = create<UseSaveInterface>((set)=>({
    isSaving : false,
    setIsSaving : (value: boolean)=>set({isSaving: value})
}));