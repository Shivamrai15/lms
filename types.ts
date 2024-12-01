import { QNA, Solution } from "@prisma/client";

export type QNAResponse = (QNA & {
    user : { id: string, name: string|null, image: string|null };
    solution : Solution|null;
});


export type Message  = {
    id : string;
    chapterId: string;
    userId: string;
    chat: string;
    response: string;
    createdAt : Date;
}

export type Achievement = {
    _count : {
        id: number
    };
    createdAt : Date;
} 


export type Course  = {
    id: string;
    title: string;
    price: number;
    image: string;
    total_purchases: number;
    average_rating: string;
    tutor_name: string;
}