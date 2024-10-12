import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/schemas/profile.schema";
import { Gender } from "@prisma/client";
import { NextResponse } from "next/server";


export async function PATCH (req: Request) {
    try {
        
        const session = await auth();
        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized attempt", {status: 400});
        }

        const body = await req.json();
        const validatedData = await ProfileSchema.safeParseAsync(body);
        if (!validatedData.success) {
            return new NextResponse("Invalid fields", {status: 400});
        }

        const data = validatedData.data;

        const profile = await db.user.update({
            where : {
                id : session.user.id
            },
            data : {
                name :  data.name,
                profile : {
                    update : {
                        description : data.description, 
                        gender : data.gender,
                        headline : data.headline
                    }
                }
            }
        });

        return NextResponse.json(profile);

    } catch (error) {
        console.error("Profile PATCH API ERROR")
        return new NextResponse("Internal server error", {status: 500});
    }
}