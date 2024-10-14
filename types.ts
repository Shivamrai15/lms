import { QNA, Solution } from "@prisma/client";

export type QNAResponse = (QNA & {
    user : { id: string, name: string|null, image: string|null };
    solution : Solution|null;
});