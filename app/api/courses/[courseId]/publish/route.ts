import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params } : { params : { courseId : string } }
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

        const chapter = await db.course.update({
            where : {
                id : params.courseId
            },
            data : {
                isPublished : true
            }
        });

        return NextResponse.json(chapter);
        
    } catch (error) {
        console.error("COURSE PUBLISH PATCH API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}