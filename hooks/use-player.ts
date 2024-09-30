import {create} from "zustand";

interface UsePlayerProps {
    onSeek : ((value: number)=>void)|null;
    setSeek : (func: (value: number)=>void)=>void;
    timeStamp : number;
    setTimeStamp : (value: number)=>void;
}

export const usePlayer = create<UsePlayerProps>((set, get)=>({
    timeStamp : 0,
    onSeek : null,
    setTimeStamp : ( value: number ) => set({timeStamp: value}),
    setSeek : (func: (value: number)=>void)=>set({onSeek: func})
}))