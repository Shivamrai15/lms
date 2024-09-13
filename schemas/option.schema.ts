import * as z from "zod";

export const OptionSchema = z.object({
    isCorrect : z.boolean().default(false),
    answer : z.string().min(1)
})