import { auth } from "@/auth";
import { db } from "@/lib/db";
import { RatingSchema } from "@/schemas/rating.schema";
import { NextResponse } from "next/server";


export async function PUT( req: Request ) {
    try {

        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", {status: 400});
        }

        const body = await req.json();
        const validatedData = await RatingSchema.safeParseAsync(body);

        if (!validatedData.success) {
            return new NextResponse("Invalid fields", {status: 400});
        }

        const data = validatedData.data;

        const rating =  await db.rate.upsert({
            where : {
                userId_courseId : {
                    userId : session.user.id,
                    courseId : data.courseId
                }
            },
            create : {
                userId : session.user.id,
                courseId : data.courseId
            },
            update : {
                comment : data.comment,
                star : data.star
            }
        });

        return NextResponse.json(rating);
        
    } catch (error) {
        console.log("USER RATING PUT API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}