import { auth } from "@/auth";
import { db } from "@/lib/db";
import { QuizResponseSchema } from "@/schemas/quiz-response.schema";
import { NextResponse } from "next/server";

export async function POST (
    req : Request,
    { params } : { params : { quizId: string } }
) {
    try {
        
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", {status: 400});
        }

        const body = await req.json();
        const validatedData = await QuizResponseSchema.safeParseAsync(body);

        if ( !validatedData.success ) {
            return new NextResponse("Invalid quiz details", {status: 400});
        }

        const data = validatedData.data;

        const quizQuestions = await db.quizQuestion.findMany({
            where : {
                quizId : params.quizId
            },
            include : {
                options : {
                    where : {
                        isCorrect : true
                    }
                }
            }
        });

        const correctQuestions : string[] = [];
        const inCorrectQuestions : string[] = [];

        quizQuestions.forEach((question)=>{
            const formOption = data.response.find((answer)=>answer.questionId===question.id)?.optionId
            const questionOption = question.options[0]?.id
            if ( formOption === questionOption ) {
                correctQuestions.push(question.id);
            } else {
                inCorrectQuestions.push(question.id);
            }
        });

        await db.quizResult.create({
            data : {
                userId : session.user.id,
                correctQuestions,
                inCorrectQuestions,
                quizId : params.quizId
            }
        });

        return NextResponse.json({success: true});

    } catch (error) {
        console.error("USER QUIZ POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}