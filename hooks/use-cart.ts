import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UseCartProps {
    items : string[];
    toggleItem : (id: string )=>void;
}

export const useCart = create(persist<UseCartProps>((set, get)=>({
        items : [],
        toggleItem : (id: string)=>{
            if ( get().items.includes(id) ) {
                const filterdItems = get().items.filter((item_id)=>item_id!=id);
                set({items: filterdItems});
            } else {
                set({items: [...get().items, id]});
            }
        }
    }),
    {
        name : "cart",
        storage : createJSONStorage(()=>localStorage)
    }
));