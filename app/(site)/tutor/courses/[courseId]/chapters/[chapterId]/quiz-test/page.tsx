import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getQuiz } from "@/server/chapter";
import { QuizForm } from "@/components/quiz/form";
import { Actions } from "@/components/quiz/actions";


interface QuizPageProps {
    params : { courseId: string, chapterId: string }
}

const QuizPage = async({
    params
} : QuizPageProps) => {

    const session = await auth();
    if (!session) {
        redirect("/");
    }


    const quiz = await getQuiz(params.courseId, session.user.id! ,params.chapterId);
    if (!quiz ) {
        redirect("/");
    }

    return (
        <>
            <main className="p-6 md:px-8 space-y-12">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link
                            href={`/tutor/courses/${params.chapterId}`}
                            className="flex items-center text-sm hover:opacity-75 transition mb-6 font-medium"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to chapter
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-xl md:text-2xl font-bold text-zinc-800">
                                    Create Quiz
                                </h1>
                            </div>
                            <Actions
                                chapterId={params.chapterId}
                                courseId={params.courseId}
                                disabled={quiz.questions.length===0}
                                isPublished={quiz.isPublished}
                            />
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl w-full mx-auto">
                    <QuizForm
                        chapterId={params.chapterId}
                        courseId={params.courseId}
                        quiz={quiz}
                    />
                </div>
            </main>
        </>
    )
}

export default QuizPage;