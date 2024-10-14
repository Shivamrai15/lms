import { auth } from "@/auth"
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getQuizById } from "@/server/quiz";
import { Unauthorized } from "@/components/quiz/unauthorized";
import { Badge } from "@/components/ui/badge";
import { Quiz } from "@/components/quiz/quiz";

export const metadata : Metadata = {
    title : "Quiz"
}

interface QuizPageProps {
    params : { courseId: string, quizId: string }
}

const QuizPage = async({
    params
}:  QuizPageProps) => {
    
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return redirect("/");
    }

        
    const quiz = await getQuizById(params.courseId, params.quizId, session.user.id);

    if (!quiz) {
        return (
            <Unauthorized
                courseId={params.courseId}
            />
        )
    }

    if ( quiz.result[0] ) {
        return redirect(`/course/${params.courseId}/quiz/${params.quizId}/result`)
    }
    
    return (
        <main
            className="px-6 max-w-3xl w-full mx-auto"
        >
            <div className="py-10 flex flex-col gap-y-4">
                <div className="flex items-end">
                    <span className="text-8xl font-semibold text-zinc-800">Q</span>
                    <span className="text-2xl font-semibold text-zinc-800">uiz</span>
                </div>
                <Badge className="bg-violet-600 hover:bg-violet-600/90 px-3 py-1.5">
                    Total Questions {quiz._count.questions}
                </Badge>
            </div>
            <Quiz quiz={quiz} courseId = {params.courseId} />
        </main>
    )
}

export default QuizPage