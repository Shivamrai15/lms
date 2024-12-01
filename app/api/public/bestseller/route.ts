import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        
        const courses:any  = await db.$queryRaw`
           SELECT 
                c.id AS id,
                c.title AS title,
                c.price AS price,
                c.image AS image,
                COUNT(p.id) AS total_purchases,
                COALESCE(AVG(r.star), 0) AS average_rating,
                t.name AS tutor_name
            FROM 
                "Course" c
            LEFT JOIN 
                "Purchase" p ON c.id = p."courseId"
            LEFT JOIN 
                "Rate" r ON c.id = r."courseId"
            LEFT JOIN 
                "User" t ON c."tutorId" = t.id
            WHERE 
                c."isPublished" = true
            GROUP BY 
                c.id, t.name
            ORDER BY 
                total_purchases DESC
            LIMIT 10;`
        
        const serializedCourses = courses.map((course:any) => ({
            ...course,
            total_purchases: Number(course.total_purchases),
        }));
        
        return NextResponse.json(serializedCourses);

    } catch (error) {
        console.error("BESTSELLER API ERROR", error);
        return new NextResponse("Internal server error", { status: 500});
    }
}