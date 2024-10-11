import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { VideoPlayer } from "@/components/utils/video-player";
import { Banner } from "@/components/utils/banner";
import { getChapter } from "@/server/chapter";
import { Options } from "@/components/chapters/ui/options";

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
        redirect("/login");
    }

    const { chapter, course, nextChapter, purchase, userProgress } = await getChapter({chapterId : params.chapterId, courseId: params.courseId, userId: session.user.id!});
    if (!chapter || !course) {
        redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;
    
    return (
        <div className="h-full">
            <div>
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
                <div className="flex flex-col w-full">
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
            </div>
            <Options
                chapter={chapter}
                course={course}
                courseId={params.courseId}
                isPurchased={!!purchase}
                nextChapterId={nextChapter?.id}
                userProgress={userProgress}
            />
        </div>
    )
}

export default ChapterPage;