import { create } from "zustand";
import { Note } from "@prisma/client";
import { persist, createJSONStorage } from "zustand/middleware";

interface UseNotesProps {
    notes : Note[];
    addNotes : (notes:Note[])=>void;
    createNote : (note: Note)=>void;
    updateNote : (note: Note)=>void;
    deleteNote : (id: string)=>void;

}

export const useNotes = create(persist<UseNotesProps>((set, get)=>({
        notes : [],
        addNotes : (notes: Note[])=>set({notes}),
        createNote : (note:Note)=>{
            const existedNotes = get().notes;
            const notes = [...existedNotes, note]
            notes.sort((a, b)=>a.time-b.time);
            set({notes});
        },
        updateNote : (note: Note)=>{
            const filterdNotes = get().notes.filter((n)=>n.id!==note.id);
            const notes = [...filterdNotes, note]
            notes.sort((a, b)=>a.time-b.time);
            set({notes});
        },
        deleteNote : (id: string)=>{
            const notes = get().notes.filter((note)=>note.id!==id);
            set({notes})
        }
    }),
    {
        name : "notes",
        storage : createJSONStorage(()=>localStorage)
    }
))