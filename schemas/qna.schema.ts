import * as z from "zod";

export const QNASchema = z.object({
    question : z.string().min(1),
    chapterId: z.string().min(1)
});