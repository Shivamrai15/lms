import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT (
    req : Request,
    { params } : {params : { courseId: string}}
) {
    try {
        
        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }
        const { list } : {list : {id: string, position: number}[]} = await req.json();

        const courseTutor = await db.course.findUnique({
            where : {
                id : params.courseId,
                tutorId : session.user.id
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        await Promise.all(list.map((item)=>db.chapter.update({
            where : { id: item.id },
            data : { position: item.position }
        })));

        return NextResponse.json({success: true});

    } catch (error) {
        console.error("CHAPTER REORDER API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}