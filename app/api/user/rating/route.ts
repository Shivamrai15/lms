import { auth } from "@/auth";
import { db } from "@/lib/db";
import { RatingSchema } from "@/schemas/rating.schema";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
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

        const data = validatedData.data

        const rating = await db.rate.create({
            data : {
                userId : session.user.id,
                star : data.star,
                courseId : data.courseId,
                comment : data.comment,
            }
        });

        return NextResponse.json(rating)

    } catch (error) {
        console.log("USER RATING POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}


export async function PATCH (req: Request) {
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

        const rating = await db.rate.update({
            where : {
                userId_courseId : {
                    userId : session.user.id,
                    courseId : data.courseId
                }
            },
            data : {
                star : data.star,
                comment : data.comment,
            }
        });

        return NextResponse.json(rating)

    } catch (error) {
        console.log("USER RATING POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}