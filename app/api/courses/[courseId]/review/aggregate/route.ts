import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { courseId: string } } 
) {
    try {
        
        const [summary, group] = await Promise.all([
            db.rate.aggregate({
                where: {
                    courseId: params.courseId,
                },
                _count: true,
                _avg: {
                    star: true,
                },
            }),
            db.rate.groupBy({
                by: ['star'],
                where: {
                    courseId: params.courseId,
                },
                _count: {
                    star: true,
                },
            }),
        ]);

        return NextResponse.json({summary, group})

    } catch (error) {
        return new NextResponse("Internal server error", {status : 500});
    }
}