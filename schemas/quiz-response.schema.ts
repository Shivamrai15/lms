import * as z from "zod";

export const QuizResponseSchema = z.object({
    response : z.array(z.object({
        questionId: z.string().min(1),
        optionId: z.string().min(1)
    }))
})