"use server";

import { db } from "@/lib/db";
import { Chapter } from "@prisma/client";

export const getChapterById = async(chapterId: string, courseId: string)=>{
    try {
        
        const chapter = await db.chapter.findUnique({
            where : {
                id : chapterId,
                courseId: courseId
            },
            include : {
                muxData : true
            }
        });

        return chapter

    } catch (error) {
        return null;
    }
}

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId : string;
}

export const getChapter = async({
    chapterId,
    courseId,
    userId
} : GetChapterProps)=> {
    try {
        
        const purchase = await db.purchase.findUnique({
            where : {
                userId_courseId : {
                    userId,
                    courseId
                }
            }
        });

        const course = await db.course.findUnique({
            where : {
                    isPublished : true,
                    id : courseId
            },
            select : {
                price : true,
                image : true
            }
        });

        const chapter = await db.chapter.findUnique({
            where : {
                id: chapterId,
                isPublished :true
            }
        });

        let nextChapter : Chapter|null = null;

        if (!chapter || !course) {
            throw new Error("Chapter or course not found");
        }

        if (chapter.isFree || purchase) {
            nextChapter = await db.chapter.findFirst({
                where : {
                    courseId,
                    isPublished : true,
                    position : {
                        gt : chapter.position
                    }
                },
                orderBy : {
                    position : "asc"
                }
            });
        }

        const userProgress = await db.userProgress.findUnique({
            where : {
                userId_chapterId : {
                    userId,
                    chapterId
                }
            }
        });

        return  {
            chapter,
            course,
            nextChapter,
            userProgress,
            purchase
        }

    } catch (error) {
        return  {
            chapter : null,
            course : null,
            nextChapter : null,
            userProgress: null,
            purchase : null,
        }
    }
}