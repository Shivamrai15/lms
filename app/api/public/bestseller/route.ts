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
            select: {
                id: true,
                title: true,
                price: true,
                isPublished: true,
                image : true,
                _count : {
                    select : {
                        purchases : true
                    }
                }
              },
        })

        return NextResponse.json(courses);

    } catch (error) {
        console.error("BESTSELLER API ERROR", error);
        return new NextResponse("Internal server error", { status: 500});
    }
}