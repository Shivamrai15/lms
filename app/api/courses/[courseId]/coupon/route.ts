import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CouponSchema } from "@/schemas/coupon.schema";
import { NextResponse } from "next/server";

export async function POST (
    req: Request,
    { params } : { params : { courseId: string } }
) {
    try {
        
        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const body = await req.json();
        const validatedData = await CouponSchema.safeParseAsync(body); 

        if (!validatedData.success) {
            return new NextResponse("Invalid fields", {status: 401});
        }

        const courseTutor = await db.course.findUnique({
            where : {
                id : params.courseId,
                tutorId : session.user.id
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const data = validatedData.data;

        const coupon = await db.coupon.create({
            data : {
                coupon : data.coupon,
                courseId : params.courseId,
                discount : data.discount,
                expires : new Date(data.expires)
            }
        });


        return NextResponse.json(coupon);

    } catch (error) {
        return new NextResponse("Internal server error", { status: 500});
    }
}