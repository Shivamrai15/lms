import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserProgressCount } from "@/server/progress";
import { Course, Rate } from "@prisma/client";
import { NextResponse } from "next/server";


type CoursesWithProgressAndCategory = Course & {
    _count: {
        chapters: number;
    };
    progress : number|null;
    ratings: Rate[];
}

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
                },
                _count : {
                    select : {
                        chapters : {
                            where : {
                                isPublished : true
                            }
                        }
                    }
                }
            }
        }) as CoursesWithProgressAndCategory[] ;

        await Promise.all(courses.map(async(course)=>{
            const progress = await getUserProgressCount(session.user.id!, course.id);
            course["progress"] = progress;
        }))

        return NextResponse.json(courses);

    } catch (error) {
        console.log("USER COURSES API GET ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}