import * as z from "zod";

export const DescriptionSchema = z.object({
    description : z.string().min(1, {
        message : "Description is required"
    })
});