import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Actions } from "@/components/chapters/forms/actions";
import { ChapterAccessForm } from "@/components/chapters/forms/chapter-access.form";
import { DescriptionForm } from "@/components/chapters/forms/description.form";
import { TitleForm } from "@/components/chapters/forms/title.form";
import { VideoForm } from "@/components/chapters/forms/video.form";
import { IconBage } from "@/components/ui/icon-badge";
import { Progress } from "@/components/ui/progress";
import { Banner } from "@/components/utils/banner";
import { getChapterById } from "@/server/chapter";
import { ResourcesForm } from "@/components/chapters/forms/resource.form";
import { ArrowLeft, Braces, Eye, FileText, LayoutDashboard, Video, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizForm } from "@/components/chapters/forms/quiz.form";
import { VideoLengthForm } from "@/components/chapters/forms/video-lenght.form";
import { TranscriptForm } from "@/components/chapters/forms/transcript";



interface ChapterPageProps {
    params : { courseId: string, chapterId: string }
}

const ChapterPage = async({
    params
} : ChapterPageProps) => {
    
    const session = await auth();
    if (!session) {
        redirect("/");
    }

    const chapter = await getChapterById(params.chapterId, params.courseId);
    if (!chapter ) {
        redirect("/");
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <>
            { !chapter.isPublished && (
                <Banner
                    variant="warning"
                    label="This chapter is unpublished. It will not be published in course"
                />
            ) }
            <main className="p-6 md:px-8">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link
                            href={`/tutor/courses/${params.courseId}`}
                            className="flex items-center text-sm hover:opacity-75 transition mb-6 font-medium"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to course
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-xl md:text-2xl font-bold text-zinc-800">
                                    Create Chapter
                                </h1>
                                <div className="flex flex-col gap-y-2">
                                    <span className="text-sm text-zinc-600 font-medium">Complete all fields {completionText}</span>
                                    <Progress value={(completedFields/totalFields)*100} className="max-w-sm w-full" />
                                </div>
                            </div>
                            <Actions
                                disabled={totalFields!==completedFields}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                isPublished={chapter.isPublished}
                            />
                        </div>
                    </div>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-16">
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBage icon={LayoutDashboard}/>
                                <h1 className="text-lg md:text-xl font-semibold text-zinc-700">
                                    Customize chapter
                                </h1>
                            </div>
                            <TitleForm
                                initialData={chapter}
                                courseId={chapter.courseId}
                                chapterId={chapter.id}
                            />
                            <DescriptionForm
                                initialData={chapter}
                                courseId={chapter.courseId}
                                chapterId={chapter.id}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBage icon={Eye}/>
                                <h1 className="text-lg md:text-xl font-semibold text-zinc-700">
                                    Access settings
                                </h1>
                            </div>
                            <ChapterAccessForm
                                initialData={chapter}
                                courseId={chapter.courseId}
                                chapterId={chapter.id}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBage icon={Video}/>
                                <h1 className="text-lg md:text-xl font-semibold text-zinc-700">
                                    Add a video
                                </h1>
                            </div>
                            <VideoForm
                                initialData={chapter}
                                courseId={chapter.courseId}
                                chapterId={chapter.id}
                            />
                            <VideoLengthForm
                                initialData={chapter}
                                courseId={chapter.courseId}
                                chapterId={chapter.id}
                            />
                            <TranscriptForm
                                initialData={chapter}
                                courseId={chapter.courseId}
                                chapterId={chapter.id}
                            />
                        </div>
                    </div>
                    <div className="space-y-10">
                        <div className="flex items-center gap-x-2">
                            <IconBage icon={Braces}/>
                            <h1 className="text-lg md:text-xl font-semibold text-zinc-700">
                                Optional fields
                            </h1>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBage icon={FileText}/>
                                <h1 className="text-lg md:text-xl font-semibold text-zinc-700">
                                    Add resources
                                </h1>
                            </div>
                            <ResourcesForm
                                initialData={chapter}
                                courseId={chapter.courseId}
                                chapterId={chapter.id}
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-x-2">
                                <IconBage icon={BookOpenCheck}/>
                                <h1 className="text-lg md:text-xl font-semibold text-zinc-700">
                                    { chapter.quiz ? "Update Quiz Test" : "Add Quiz Test" }
                                </h1>
                            </div>
                            <QuizForm
                                initialData={chapter}
                                courseId={chapter.courseId}
                                chapterId={chapter.id}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ChapterPage