"use client";

import { useEffect } from "react";
import { 
    Attachment, 
    Chapter, 
    Note, 
    UserProgress, 
    Cerificate
} from "@prisma/client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger 
} from "@/components/ui/tabs";
import { Overview } from "@/components/chapters/ui/overview";
import { Notes } from "@/components/chapters/ui/notes";
import { useNotes } from "@/hooks/use-notes";
import { Canvas } from "./canvas";
import CourseReview from "@/components/rating/course-review";
import { QNA } from "@/components/qna/qna";
import { AI } from "@/components/ai/ai";

interface OptionsProps {
    chapter : Chapter & { notes : Note[], attachments : Attachment[] };
    courseId : string;
    course : {
        image: string | null;
        price: number | null;
        updatedAt: Date;
        _count: {
            purchases: number;
            ratings: number;
        };
        shortDescription: string | null;
        tutor: {
            name: string | null;
            image: string | null;
            profile: {
                description: string|null;
                headline : string|null;
                facebookLink : string|null;
                githubLink : string|null;
                websiteLink : string|null;
                linkedinLink : string|null;
                twitterLink : string|null;
                youtubeLink :string|null;
            } | null;
        };
    },
    isPurchased : boolean;
    userProgress : UserProgress|null;
    nextChapterId? : string;
    certificate : Cerificate|null;
    quizId? : string;
    quizResultId? : string;
}


export const Options = ({
    chapter,
    course,
    courseId,
    isPurchased,
    userProgress,
    nextChapterId,
    certificate,
    quizId,
    quizResultId
} : OptionsProps ) => {

    const { addNotes } = useNotes();
    
    useEffect(()=>{
        addNotes(chapter.notes);
    }, []);


    return (
        <div className="min-h-full h-full">
            <Tabs defaultValue="overview" className="w-full h-full">
                <TabsList className="w-full h-16 justify-start px-6 gap-x-4 md:px-10 overflow-x-auto">
                    <TabsTrigger value="overview" className="text-[16px] font-semibold">Overview</TabsTrigger>
                    <TabsTrigger value="notes" className="text-[16px] font-semibold">Notes</TabsTrigger>
                    <TabsTrigger value="canvas" className="text-[16px] font-semibold">Canvas</TabsTrigger>
                    <TabsTrigger value="reviews" className="text-[16px] font-semibold">Reviews</TabsTrigger>
                    <TabsTrigger value="qna" className="text-[16px] font-semibold" >QNA</TabsTrigger>
                    <TabsTrigger value="ai" className="text-[16px] font-semibold" >AI</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Overview
                        description={chapter.description!}
                        purchases={course._count.purchases}
                        ratings={course._count.ratings}
                        shortDescription={course.shortDescription!}
                        tutor={course.tutor}
                        updatedAt={course.updatedAt}
                        isPurchased={isPurchased}
                        chapterId={chapter.id}
                        courseId={courseId}
                        nextChapterId={nextChapterId}
                        userProgress={userProgress}
                        certificate={certificate}
                        quizId={quizId}
                        quizResultId={quizResultId}
                    />
                </TabsContent>
                <TabsContent value="notes">
                    <Notes 
                        chapterId={chapter.id}
                        courseId={courseId}
                        isPurchased={isPurchased}
                    />
                </TabsContent>
                <TabsContent value="canvas" className="h-[calc(100%-4rem)]">
                    <Canvas chapterId={chapter.id} />
                </TabsContent>
                <TabsContent value="reviews">
                    <CourseReview courseId={courseId} />
                </TabsContent>
                <TabsContent value="qna" className="h-[calc(100%-4rem)]" >
                    <QNA chapterId={chapter.id}/>
                </TabsContent>
                <TabsContent value="ai" className="h-[calc(100%-4rem)] " >
                    <AI
                        chapterId={chapter.id}
                        title = {chapter.title}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
