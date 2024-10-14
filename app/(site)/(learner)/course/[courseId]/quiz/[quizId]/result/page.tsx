import { auth } from "@/auth";
import { InfoCard } from "@/components/quiz/info";
import { OutputCard } from "@/components/quiz/output-card";
import { Unauthorized } from "@/components/quiz/unauthorized";
import { Badge } from "@/components/ui/badge";
import { getQuizById } from "@/server/quiz";
import { CheckCircle, XCircle } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata : Metadata = {
    title : "Result"
}

interface QuizResultPageProps {
    params : {
        courseId: string;
        quizId: string;
    }
}

const QuizResultPage = async({
    params
}: QuizResultPageProps ) => {

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

    if ( !quiz.result[0] ) {
        return redirect(`/course/${params.courseId}/quiz/${params.quizId}`)
    }

    return (
        <main
            className="px-6 max-w-3xl w-full mx-auto"
        >
            <div className="py-10 flex flex-col gap-y-4">
                <div className="flex items-end">
                    <span className="text-8xl font-semibold text-zinc-800">Q</span>
                    <span className="text-2xl font-semibold text-zinc-800">uiz Result</span>
                </div>
                <Badge className="bg-violet-600 hover:bg-violet-600/90 px-3 py-1.5">
                    Total Questions {quiz._count.questions}
                </Badge>
            </div>
            <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                    icon={CheckCircle}
                    label="Correct answers"
                    value={quiz.result[0].correctQuestions.length}
                    variant="success"
                />
                <InfoCard
                    icon={XCircle}
                    label="Incorrect answers"
                    value={quiz.result[0].inCorrectQuestions.length}
                    variant="default"
                />
            </div>
            <div className="w-full py-10 flex flex-col gap-y-6" >
                {
                    quiz.questions.map((question)=>(
                        <OutputCard
                            key={question.id}
                            question={question}
                            type={quiz.result[0].correctQuestions.includes(question.id)?"correct" : quiz.result[0].inCorrectQuestions.includes(question.id) ? "incorrect" : "dropped" }
                        />
                    ))
                }

            </div>
        </main>
    )
}

export default QuizResultPage;