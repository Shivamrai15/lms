import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (
    req : Request,
    { params } : { params : { courseId : string } }
) {
    try {
   
        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const purchase = await db.purchase.findUnique({
            where : {
                userId_courseId : {
                    userId : session.user.id,
                    courseId : params.courseId
                }
            }
        });

        if (!purchase) {
            return new NextResponse("Course is not purchased", {status: 401});
        }

        const certificate = await db.cerificate.create({
            data : {
                userId : session.user.id,
                courseId : params.courseId
            }
        });

        return NextResponse.json(certificate);
        
    } catch (error) {
        console.error("CERTIFICATE POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }

}