import * as z from "zod";

export const CouponSchema = z.object({
    coupon : z.string().min(1, {
        message : "Coupon is required"
    })
});