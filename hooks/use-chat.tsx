import { Message } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface UseChatProps {
    messages : Message[];
    addChat : ( id: string, chapterId: string, chat: string, userId: string )=>void;
    addResponse : (id: string, response: string)=>void;
    getUserChat : (chapterId: string, userId: string)=>Message[];
}


export const useChat = create(persist<UseChatProps>((set, get)=>({
        messages : [],
        addChat : ( id: string, chapterId: string, chat: string, userId: string )=> set({
            messages : [...get().messages, {
                id,
                chapterId,
                chat,
                response : "",
                userId,
                createdAt : new Date()
            }]
        }),
        addResponse : (id: string, response: string)=>{
            const message = get().messages.find((message)=>message.id===id);
            if (!message) {
                toast.error("Something went wrong");
                return;
            }

            const filterdMessages = get().messages.filter((message)=>message.id!==id);
            const newResponse = message.response+response;
            const updatedMessage = {
                ...message,
                response : newResponse
            }

            set({messages : [...filterdMessages, updatedMessage]})
        },
        getUserChat : (chapterId: string, userId: string)=>{
            const messages = get().messages.filter((message)=>(message.userId===userId&&message.chapterId===chapterId));
            return messages
        }
    }), 
    {
        name:"AI chats",
        storage : createJSONStorage(()=>localStorage)
    }
))