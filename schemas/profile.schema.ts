import * as z from "zod";

export const ProfileSchema = z.object({
    name : z.string().min(1, {
        message : "Name is required",
    }),
    headline : z.string().optional(),
    description : z.string(),
    gender : z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
});