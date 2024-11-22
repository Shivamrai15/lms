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