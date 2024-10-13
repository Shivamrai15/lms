import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {

        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", {status: 400});
        }

        const courses = await db.course.findMany({
            where : {
                purchases : {
                    some : {
                        userId : session.user.id
                    }
                }
            },
            include : {
                ratings : {
                    where : {
                        userId : session.user.id
                    }
                }
            }
        });

        return NextResponse.json(courses);

    } catch (error) {
        console.log("USER COURSES API GET ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}