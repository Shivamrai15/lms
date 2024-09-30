import * as z from "zod";

export const NotesSchema = z.object({
    time : z.number().min(0),
    note : z.string().min(1)
})