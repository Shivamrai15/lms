import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { profile } from "console";
import { NextResponse } from "next/server";

export async function PATCH (req: Request) {
    try {
        
        const session = await auth();
        if (!session || !session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const  { role }: { role: "LEARNER" | "TUTOR" } = await req.json();
        if ( role !== "LEARNER" && role!="TUTOR" ) {
            return new NextResponse("Invalid role", {status: 401});
        }

        await db.user.update({
            where : {
                id : session.user.id
            },
            data : {
                role : role === "LEARNER" ? Role.LEARNER : Role.TUTOR
            }
        });

        await db.profile.create({
            data : {
                userId : session.user.id
            }
        });

        return NextResponse.json({success: true});

    } catch (error) {
        console.log("USER ROLE PATCH API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}