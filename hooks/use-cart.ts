import { Course } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UseCartProps {
    items : Course[];
    toggleItem : (course: Course )=>void;
}

export const useCart = create(persist<UseCartProps>((set, get)=>({
        items : [],
        toggleItem : (course: Course)=>{
            if ( get().items.find((item)=>item.id===course.id) ) {
                const filterdItems = get().items.filter((item)=>item.id!=course.id);
                set({items: filterdItems});
            } else {
                set({items: [...get().items, course]});
            }
        }
    }),
    {
        name : "cart",
        storage : createJSONStorage(()=>localStorage)
    }
));