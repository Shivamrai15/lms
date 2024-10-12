"use server";

import { db } from "@/lib/db";


export const courseMetadata = async( courseId: string )=>{
    try {
        
        const course = await db.course.findUnique({
            where : {
                id : courseId
            },
            select : {
                id : true,
                image : true,
                title : true,
                shortDescription : true
            }
        });

        return course;

    } catch (error) {
        return null;
    }
}

export const chapterMetadata = async( chapterId: string ) => {
    try {
        
        const chapter = await db.chapter.findUnique({
            where : {
                id : chapterId
            },
            select : {
                id : true,
                title : true,
                course : {
                    select : {
                        image : true
                    }
                }
            }
        });

        return chapter;

    } catch (error) {
        return null;
    }
}