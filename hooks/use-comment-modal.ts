import { create } from "zustand";
import { KeyedMutator } from "swr";
import { Rate } from "@prisma/client";

interface Course {
    id: string;
    title: string;
    shortDescription: string | null;
    image: string | null;

}

interface UseCommentModal {
    rating : Rate|null;
    isOpen : boolean;
    course : Course|null;
    mutate : KeyedMutator<any>|null;
    onOpen : (rating : Rate|null, mutate: KeyedMutator<any>, course: Course)=>void;
    onClose : ()=>void;
}

export const useCommentModal = create<UseCommentModal>((set)=>({
    rating : null,
    isOpen : false,
    mutate : null,
    course : null,
    onOpen : (rating : Rate|null, mutate: KeyedMutator<any>, course: Course)=>set({ rating, mutate, isOpen: true, course }),
    onClose : ()=>set({rating:null, isOpen: false, mutate: null})
}))