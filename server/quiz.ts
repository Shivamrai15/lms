"use server";

import { db } from "@/lib/db";

export const getQuizById = async(courseId: string, quizId: string, userId: string)=>{
    try {
        const isPurchased = await db.purchase.findUnique({
            where : {
                userId_courseId : {
                    userId,
                    courseId
                }
            }
        });

        if (!isPurchased) {
            return null;
        }

        const quiz = await db.quiz.findUnique({
            where : {
                id: quizId
            },
            include : {
                questions : {
                    include : {
                        options : true
                    },
                    orderBy : {
                        position : "asc"
                    }
                },
                _count : {
                    select : {
                        questions : true
                    }
                },
                result : {
                    where : {
                        userId
                    }
                }
            }
        });

        return quiz;

    } catch (error) {
        console.error("QUIZ SERVER API ERROR");
        return null;
    }
}