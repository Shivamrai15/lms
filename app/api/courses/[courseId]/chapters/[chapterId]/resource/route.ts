import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (
    req: Request,
    { params } : { params : { courseId : string, chapterId: string } }
) {
    try {

        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const { name, url } : { name : string, url: string }  = await req.json();
        if (!name || !url) {
            return new NextResponse("Name and URL required", {status: 401});
        }


        const courseTutor = await db.course.findUnique({
            where : {
                id : params.courseId,
                tutorId : session.user.id
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const resource = await db.attachment.create({
            data : {
                chapterId : params.chapterId,
                name,
                url
            }
        })

        return NextResponse.json(resource);
        
    } catch (error) {
        console.error("CHAPTER RESOURCE POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}

export async function PATCH (
    req: Request,
    { params } : { params : { courseId : string, chapterId: string } }
) {
    try {

        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("Resource Id required", {status: 401});
        }

        const { name, url } : { name : string, url: string }  = await req.json();
        if (!name || !url) {
            return new NextResponse("Name and URL required", {status: 401});
        }


        const courseTutor = await db.course.findUnique({
            where : {
                id : params.courseId,
                tutorId : session.user.id
            }
        });

        if ( !courseTutor ) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const resource = await db.attachment.update({
            where : {
                id
            },
            data : {
                name,
                url
            }
        });

        return NextResponse.json(resource);
        
    } catch (error) {
        console.error("CHAPTER RESOURCE POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}