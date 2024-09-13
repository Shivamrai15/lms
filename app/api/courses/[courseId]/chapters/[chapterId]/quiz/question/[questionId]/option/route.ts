import { auth } from "@/auth";
import { db } from "@/lib/db";
import { OptionSchema } from "@/schemas/option.schema";
import { NextResponse } from "next/server";


export async function POST (
    req: Request,
    { params } : { params : { courseId : string, chapterId: string, questionId: string } }
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
            },
            select :{ 
                id : true
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const option = await db.option.create({
            data : {
                answer : "",
                questionId : params.questionId
            }
        });

        return NextResponse.json(option);
        
    } catch (error) {
        console.error("QUIZ OPTION POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}


export async function PATCH (
    req: Request,
    { params } : { params : { courseId : string, chapterId: string, questionId: string } }
) {
    try {

        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("Id required", {status: 401});
        }

        const body = await req.json();
        const validatedData = await OptionSchema.safeParseAsync(body);

        if (!validatedData.success) {
            return new NextResponse("Invalid fields", {status: 401});
        }

        const courseTutor = await db.course.findUnique({
            where : {
                id : params.courseId,
                tutorId : session.user.id
            },
            select :{ 
                id : true
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const option = await db.option.update({
            where : {
                id
            },
            data : validatedData.data
        });

        return NextResponse.json(option);
        
    } catch (error) {
        console.error("QUIZ OPTION POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}


export async function DELETE (
    req: Request,
    { params } : { params : { courseId : string, chapterId: string, questionId: string } }
) {
    try {

        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("Id required", {status: 401});
        }

        const courseTutor = await db.course.findUnique({
            where : {
                id : params.courseId,
                tutorId : session.user.id
            },
            select :{ 
                id : true
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }


        await db.option.delete({
            where : {
                id
            }
        });
        
        return NextResponse.json({success: true});
        
    } catch (error) {
        console.error("QUIZ OPTION DELETE API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}