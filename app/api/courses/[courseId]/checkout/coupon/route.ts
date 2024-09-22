import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params } : { params : { courseId : string } }
) {
    
    try {

        const { searchParams } = new URL(req.url);
        const coupon = searchParams.get("coupon");

        if (!coupon) {
            return new NextResponse("Coupon Code is required", { status: 400 });
        }

        const existedCoupon = await db.coupon.findUnique({
            where : {
                courseId_coupon : {
                    courseId : params.courseId,
                    coupon
                }
            }
        });

        if ( !existedCoupon ) {
            return new NextResponse('Coupon is invalid', { status: 404 }); 
        }

        if ( existedCoupon.expires < new Date() ) {
            return new NextResponse('Coupon is expired', { status: 404 }); 
        }

        return NextResponse.json({
            coupon,
            courseId: existedCoupon.courseId,
            discount: existedCoupon.discount 
        });

    } catch (error) {
        console.log("CHECKOUT COUPON GET API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }

}