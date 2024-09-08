import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { Banner } from "@/components/utils/banner";
import { CourseEnrollButton } from "@/components/utils/course-enroll-button";
import { Preview } from "@/components/utils/preview";
import { VideoPlayer } from "@/components/utils/video-player";
import { getChapter } from "@/server/chapter";
import { redirect } from "next/navigation";

interface ChapterPageProps {
    params : {
        chapterId: string;
        courseId: string;
    }
}

const ChapterPage = async({
    params
} : ChapterPageProps ) => {
    
    const session = await auth();
    if (!session) {
        redirect("/");
    }

    const { chapter, course, nextChapter, purchase, userProgress } = await getChapter({chapterId : params.chapterId, courseId: params.courseId, userId: session.user.id!});
    if (!chapter || !course) {
        redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;
    
    return (
        <div className="">
            {
                userProgress?.isCompleted && (
                    <Banner
                        variant="success"
                        label="You already completed this chapter."
                    />
                )
            }
            {
                isLocked && (
                    <Banner
                        variant="warning"
                        label="You need to purchase this course to watch this chapter"
                    />
                )
            }
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId = {params.chapterId}
                        title = {chapter.title}
                        courseId = {params.courseId}
                        nextChapterId = {nextChapter?.id}
                        videoUrl = {chapter.videoUrl!}
                        isLocked = {isLocked}
                        completeOnEnd = {completeOnEnd}
                        thumbnail={course.image!}
                    />
                </div>
                <div className="space-y-2">
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-xl md:text-2xl font-semibold text-zinc-800 mb-2">
                            {chapter.title}
                        </h2>
                        {
                            purchase ? (
                                <></>
                            ) : (
                                <CourseEnrollButton
                                    courseId = { params.courseId }
                                    price={course.price!}
                                />
                            )
                        }
                    </div>
                    <div className="space-y-2">
                        <h2 className="font-semibold text-zinc-700" >Description</h2>
                        <Preview value={chapter.description!} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChapterPage;