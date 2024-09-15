import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE (
    req: Request,
    { params } : { params : { courseId: string, couponId: string } }
) {
    try {
        
        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
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

        await db.coupon.delete({
            where : {
                id : params.couponId,
                courseId: params.courseId
            }
        })

        return NextResponse.json({success: true});

    } catch (error) {
        return new NextResponse("Internal server error", { status: 500});
    }
}