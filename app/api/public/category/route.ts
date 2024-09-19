import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
    try {

        const categories = await db.subCategory.findMany({
            include :{
                _count : {
                    select : {
                        courses : true
                    }
                }
            },
            orderBy : {
                courses : {
                    _count : "desc"
                }
            },  
        });

        return NextResponse.json(categories);
        
    } catch (error) {
        console.log("CATEGORY PUBLIC API ERROR");
        return new NextResponse("Internal server error");
    }
}