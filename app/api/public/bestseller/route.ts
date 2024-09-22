import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        
        const courses = await db.course.findMany({
            where : {
                isPublished : true
            },
            orderBy : {
                purchases : {
                    _count : "desc"
                }
            },
            include : {
                _count : {
                    select : {
                        purchases : true,
                        ratings : true
                    }
                },
                tutor : {
                    select : {
                        name : true,
                        id : true
                    }
                }
            }
        });

        return NextResponse.json(courses);

    } catch (error) {
        console.error("BESTSELLER API ERROR", error);
        return new NextResponse("Internal server error", { status: 500});
    }
}