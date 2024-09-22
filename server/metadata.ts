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