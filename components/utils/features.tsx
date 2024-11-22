import { Abril_Fatface } from "next/font/google";
import Image from "next/image";
import { Heading } from "./heading";

const font =  Abril_Fatface({
    subsets : ["latin"],
    weight : ["400"]
})

export const Features = () => {
    return (
        <div className="mt-20 md:pb-20">
            <div className={font.className}>
                <Heading className="text-xl md:text-3xl lg:text-5xl font-[600] text-zinc-700">Goals are the compass, learning is the journey.</Heading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-10 gap-6">
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/ai.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">AI-Powered Learning</h3>
                            <p className="text-sm text-zinc-800 text-justify text-pretty">AI-Powered Chatbot: Instantly resolve course-related doubts through an intuitive and user-friendly interface, enabling seamless learning support.</p>
                        </div>
                    </div>
                </div>
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/notes.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Personalized Note Editor</h3>
                            <p className="text-sm text-zinc-800 text-justify text-pretty">Empower students with an advanced note editor that allows them to add to-dos, embed screenshots, and much more for enhanced organization and productivity.</p>
                        </div>
                    </div>
                </div>
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/exam.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Proctored exams</h3>
                            <p className="text-sm text-zinc-800 text-justify text-pretty">Students can take quiz-based exams to assess their learning, identify areas for improvement, and enhance their knowledge in a competitive environment.</p>
                        </div>
                    </div>
                </div>
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/certificate.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Digital Certificates</h3>
                            <p className="text-sm text-zinc-800 text-justify text-pretty">Upon course completion, students can generate verifiable certificates to showcase their achievements and skills.</p>
                        </div>
                    </div>
                </div>
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/graph.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Real-Time Progress Tracking</h3>
                            <p className="text-sm text-zinc-800 text-justify text-pretty">Students can track their learning milestones, course completion, and assessments in real-time, allowing for continuous feedback and improvement.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
