import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT (
    req: Request,
    { params } : { params : { chapterId : string, courseId: string } }
) {
    try {

        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const { isCompleted } = await req.json();

        const userProgress = await db.userProgress.upsert({
            where : {
                userId_chapterId : {
                    chapterId : params.chapterId,
                    userId : session.user.id
                }
            },
            update : {
                isCompleted
            },
            create : {
                userId : session.user.id,
                chapterId : params.chapterId,
                isCompleted
            }
        });

        return NextResponse.json(userProgress);

    } catch (e) {
        return new NextResponse("Internal server error", {status: 500});
    }
}