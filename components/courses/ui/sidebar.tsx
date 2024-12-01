import { Chapter, Course, Purchase, UserProgress } from "@prisma/client";
import { SidebarItem } from "./sidebar-item";
import { CourseProgress } from "./course-progress";

interface SideBarProps {
    course : Course & {
        chapters : ( Chapter & { userProgress : UserProgress[]|null })[]
    };
    progressCount : number;
    purchase: Purchase|null;
}

export const SideBar = async({
    course,
    progressCount,
    purchase
}: SideBarProps) => {
    
    return (
        <div className="h-full w-full bg-neutral-800 flex flex-col overflow-y-auto chapter-scroll">
            <div className="p-8 flex flex-col border-b">
                <h1 className="text-white font-semibold">{course.title}</h1>
                {
                    purchase && (
                        <div className="mt-10">
                            <CourseProgress
                                variant="success"
                                value={progressCount}
                            />
                        </div>
                    )
                }
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
