"use client";

import { Chapter, Course, Purchase, UserProgress } from "@prisma/client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { SidebarItem } from "./sidebar-item";
import { CourseProgress } from "./course-progress";
import { useSidebar } from "@/hooks/use-sidebar";

interface MobileSidebarProps {
    course : Course & {
        chapters : ( Chapter & { userProgress : UserProgress[]|null })[]
    };
    progressCount : number;
    purchase : Purchase|null;
}

export const MobileSidebar = ({
    course,
    progressCount,
    purchase
}: MobileSidebarProps) => {

    const { isOpen, onClose } = useSidebar();
    const onOpenChange = (open: boolean)=>{
        if (!open) {
            onClose();
        }
    }

    return (
        <Sheet
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <SheetContent className="h-full bg-neutral-800 w-full border-none p-0" side="left">
                <div className="h-full w-full flex flex-col overflow-y-auto chapter-scroll relative">
                    <SheetHeader className="flex flex-col border-b p-8 space-y-6 sticky top-0 bg-neutral-800">
                        <SheetTitle className="text-white font-semibold">{course.title}</SheetTitle>
                        {
                            purchase && (
                                <SheetDescription className="mt-10">
                                    <CourseProgress
                                        variant="success"
                                        value={progressCount}
                                    />
                                </SheetDescription>
                            )
                        }
                    </SheetHeader>
                    <div className="flex flex-col w-full pl-4">
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
            </SheetContent>
        </Sheet>     
    )
}
