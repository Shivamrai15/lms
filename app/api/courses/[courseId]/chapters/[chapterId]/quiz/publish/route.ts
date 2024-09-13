import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH (
    req: Request,
    { params } : { params : { courseId : string, chapterId: string } }
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

        await db.quiz.update({
            where : {
                chapterId : params.chapterId
            },
            data : {
                isPublished : true
            }
        });

        return NextResponse.json({success : true});
        
    } catch (error) {
        console.error("CHAPTER QUIZ POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}