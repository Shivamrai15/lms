import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST (
    req: Request,
    { params }: { params : { courseId : string, chapterId: string } }
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

        const quiz = await db.quiz.findUnique({
            where : {
                chapterId : params.chapterId
            },
            select : {
                id: true
            }
        });

        if (!quiz) {
            return new NextResponse("Quiz not found");
        }

        const question = await db.quizQuestion.create({
            data : {
                question : "",
                quizId : quiz.id,
            },
            include : {
                options : true
            }
        });
        
        return NextResponse.json(question);
        
    } catch (error) {
        console.error("QUIZ QUESTION POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}


export async function PATCH (
    req: Request,
    { params }: { params : { courseId : string, chapterId: string } }
) {
    try {
        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const { items } : { items : {id: string, position: number}[] } = await req.json();

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


        await Promise.all(items.map(async(item)=>(
            db.quizQuestion.update({
                where : {
                    id : item.id
                },
                data : {
                    position : item.position
                }
            })
        )));
        
        return NextResponse.json({success : true});
        
    } catch (error) {
        console.error("QUIZ QUESTION POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}