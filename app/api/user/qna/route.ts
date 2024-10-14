import { auth } from "@/auth";
import { db } from "@/lib/db";
import { QNASchema } from "@/schemas/qna.schema";
import { QNAResponse } from "@/types";
import { NextResponse } from "next/server";

const BATCH_SIZE = 5;

export async function GET (
    req: Request
) {
    try {

        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("ChapterId is missing", {status: 400});
        }

        let qna : QNAResponse[] = [];

        if (cursor) {
            qna = await db.qNA.findMany({
                where : {
                    chapterId : id
                },
                include : {
                    solution : true,
                    user : {
                        select : {
                            id : true,
                            name:  true,
                            image: true
                        }
                    }
                },
                take : BATCH_SIZE,
                skip : 1,
                cursor : {
                    id : cursor
                },
                orderBy : {
                    createdAt : "asc"
                }
            });
        } else {
            qna = await db.qNA.findMany({
                where : {
                    chapterId : id
                },
                include : {
                    solution : true,
                    user : {
                        select : {
                            id : true,
                            name:  true,
                            image: true
                        }
                    }
                },
                take : BATCH_SIZE,
                orderBy : {
                    createdAt : "asc"
                }
            });
        }

        let nextCursor = null;

        if(qna.length === BATCH_SIZE){
            nextCursor = qna[BATCH_SIZE-1].id
        }

        return NextResponse.json({
            items : qna,
            nextCursor
        });

    } catch (error) {
        console.error("QNA GET API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}


export async function POST (req: Request) {
    try {

        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", {status: 400});
        }

        const body = await req.json();
        const validatedData = await QNASchema.safeParseAsync(body);

        if (!validatedData.success) {
            return new NextResponse("Fields required", {status: 400});
        }

        const data = validatedData.data;

        const response = await db.qNA.create({
            data: {
                question : data.question,
                chapterId: data.chapterId,
                userId : session.user.id
            },
            include : {
                solution : true,
                user : {
                    select : {
                        id : true,
                        name:  true,
                        image: true
                    }
                }
            },
        });

        return NextResponse.json(response);
        
    } catch (error) {
        console.error("QNA POST API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}