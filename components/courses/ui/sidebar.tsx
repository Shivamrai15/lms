import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

interface SideBarProps {
    course : Course & {
        chapters : ( Chapter & { userProgress : UserProgress[]|null })[]
    };
    progressCount : number;
}

export const SideBar = async({
    course
}: SideBarProps) => {

    const session = await auth();
    if (!session) {
        redirect("/");
    }

    const purchase = await db.purchase.findUnique({
        where : {
            userId_courseId : {
                userId : session.user.id!,
                courseId : course.id
            }
        }
    });

    if (!purchase) {

    }
    
    return (
        <div className="h-full w-full bg-neutral-800 flex flex-col overflow-y-auto">
            <div className="p-8 flex flex-col border-b">
                <h1 className="text-white font-semibold">{course.title}</h1>
                {/* Check user and add progress */}

            </div>
            <div className="flex flex-col w-full">
                {
                    course.chapters.map((chapter)=>(
                        <SidebarItem
                            key = {chapter.id}
                            id = {chapter.id}
                            label= {chapter.title}
                            isCompleted = {!!chapter.userProgress?.[0]?.isCompleted}
                            courseId = {course.id}
                            isLocked = { !chapter.isFree && !purchase }
                        />
                    ))
                }
            </div>
        </div>
    )
}
