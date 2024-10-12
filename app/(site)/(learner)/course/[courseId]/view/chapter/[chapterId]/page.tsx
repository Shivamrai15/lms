import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { VideoPlayer } from "@/components/utils/video-player";
import { Banner } from "@/components/utils/banner";
import { getChapter } from "@/server/chapter";
import { Options } from "@/components/chapters/ui/options";
import { chapterMetadata } from "@/server/metadata";

interface ChapterPageProps {
    params : {
        chapterId: string;
        courseId: string;
    }
}

export async function generateMetadata(
    { params } : ChapterPageProps,
) : Promise<Metadata> {

    const data = await chapterMetadata(params.chapterId);
    
    if ( !data ) {
        return {
            title : "Chapter"
        };
    }

    return {
        title: data.title,
        openGraph: {
            images: {
                url : data.course.image!,
                height : 1200,
                width : 1200
            },
            type : "website",
        },
        category : "chapter"
    }
}

const ChapterPage = async({
    params
} : ChapterPageProps ) => {
    
    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    const { chapter, course, nextChapter, purchase, userProgress, certificate } = await getChapter({chapterId : params.chapterId, courseId: params.courseId, userId: session.user.id!});
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
                        certificate={!!certificate}
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
                certificate={certificate}
            />
        </div>
    )
}

export default ChapterPage;