import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { courseId: string } } 
) {
    try {
        
        const reviews = await db.rate.findMany({
            where : {
                courseId : params.courseId
            },
            include : {
                user : {
                    select : {
                        name : true,
                        id : true,
                        image : true
                    }
                }
            },
            orderBy : {
                createdAt : "asc"
            }
        });

        return NextResponse.json(reviews)

    } catch (error) {
        return new NextResponse("Internal server error", {status : 500});
    }
}