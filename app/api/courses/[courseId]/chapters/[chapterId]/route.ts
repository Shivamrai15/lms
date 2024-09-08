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
        const { isPublished, ...values } = await req.json();

        const courseTutor = await db.course.findUnique({
            where : {
                id : params.courseId,
                tutorId : session.user.id
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const chapter = await db.chapter.update({
            where : {
                id : params.chapterId
            },
            data : {
                ...values
            }
        });

        return NextResponse.json(chapter);
        
    } catch (error) {
        console.error("CHAPTER PATCH API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}


export async function DELETE (
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

        await db.chapter.delete({
            where : {
                id : params.chapterId
            }
        });

        const publishedChaptersInCourse = await db.chapter.findMany({
            where : {
                courseId : params.courseId
            }
        });

        if (!publishedChaptersInCourse.length) {
            await db.course.update({
                where : {
                    id: params.courseId
                },
                data : {
                    isPublished : false
                }
            });
        }

        return NextResponse.json({success: true});

    } catch (error) {
        console.error("CHAPTER PATCH API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}