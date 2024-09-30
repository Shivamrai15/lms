import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UseCanvasProps {
    canvasValue : { [id: string]: string };
    setCanvasValue : (id: string, value: string)=>void;
    getCanvasValue : (id: string)=>null|string;
}

export const useCanvas = create(persist<UseCanvasProps>((set, get)=>({
        canvasValue : {},
        setCanvasValue : (id: string, value: string)=>set({canvasValue : {...get().canvasValue, [id]:value}}),
        getCanvasValue : (id: string)=>{
            const value = get().canvasValue[id];
            console.log(value);
            return value;
        }
    }),
    {
        name : "canvas",
        storage : createJSONStorage(()=>localStorage)
    }
))