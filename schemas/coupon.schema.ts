import * as z from "zod";

export const CouponSchema = z.object({
    coupon : z.string().min(6, {
        message : "Minimum 6 characters are required"
    }),
    discount : z.number().min(0).max(100),
    expires : z.string().min(1)
})