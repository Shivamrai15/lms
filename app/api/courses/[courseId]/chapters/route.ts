import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (
    req: Request,
    { params } : { params : { courseId : string } }
) {
    try {

        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }
        const { title } : {title : string} = await req.json();

        const courseTutor = await db.course.findUnique({
            where : {
                id : params.courseId,
                tutorId : session.user.id
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const chapter = await db.chapter.create({
            data : {
                title,
                courseId : params.courseId
            }
        });

        return NextResponse.json(chapter);

        
    } catch (error) {
        console.error("COURSES POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}