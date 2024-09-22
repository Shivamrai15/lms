import Image from "next/image";
import { redirect } from "next/navigation";

import { Header } from "@/components/utils/header";
import { getCourseByPublicId } from "@/server/course";
import { Header as CourseHeader } from "@/components/courses/ui/header";
import { Chapters } from "@/components/courses/ui/chapters";
import { Description } from "@/components/courses/ui/description";
import { SubscriptionCard } from "@/components/courses/ui/subscription-card";
import { Metadata } from "next";
import { courseMetadata } from "@/server/metadata";


interface CoursePageProps {
    params : {courseId: string};
}

export async function generateMetadata(
    { params } : CoursePageProps,
) : Promise<Metadata> {

    const data = await courseMetadata(params.courseId);
    
    if ( !data ) {
        return {};
    }

    return {
        title: data.title,
        description: data.shortDescription,
        openGraph: {
            images: {
                url : data.image!,
                height : 1200,
                width : 1200
            },
            type : "website",
        },
        category : "course"
    }
}


const CoursePage = async({
    params
}:CoursePageProps ) => {
    
    const course = await getCourseByPublicId(params.courseId);
    if (!course) {
        redirect("/");
    }

    return (
        <main className="h-full overflow-y-auto">
            <Header variant="default" />
            <CourseHeader course={course} />
            <div className="w-full mt-20">
                <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row mx-auto px-6 gap-10 relative">
                    <div className="w-full">
                        <Chapters chapters={course.chapters} />
                        <Description description={course.description!} />
                    </div>
                    <SubscriptionCard
                        courseId={params.courseId}
                        title={course.title}
                        poster={course.image!}
                        price={course.price!}
                    />
                </div>
            </div>
            <div className="w-full mt-20 relative">
                <div className="relative aspect-[2/1] bg-neutral-800">
                    <div className="absolute z-20 left-0 -top-[.85vw] md:-top-[.75vw] h-full aspect-square">
                        <div className="h-full w-full relative">
                            <Image
                                src="/assets/kura9kf4ta6mvgsoc-left-scrolly.svg"
                                alt=""
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="right-0 top-0 absolute z-20 w-1/6 aspect-square">
                        <div className="h-full w-full relative">
                            <Image
                                src="/assets/kufvgu6gmvr5ycimn-top-right.svg"
                                alt=""
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full bg-neutral-800 absolute top md:top-20 right-0">
                    <div className="md:py-20 pb-20">
                        <div className="max-w-2xl w-full md:w-1/2 sm:ml-auto px-6 md:mr-20">
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-4xl text-white font-semibold" >This  course  includes</h2>
                                <p className="md:text-lg text-zinc-400">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, aperiam.</p>
                            </div>
                            <div className="grid grid-cols-2 w-full mt-10 gap-4">
                                <div className="w-full p-4 rounded-md border border-zinc-600 space-y-2 border-l-4">
                                    <div className="flex items-center justify-center">
                                        <div className="w-1/3 aspect-square relative">
                                            <Image
                                                src="/assets/trophy.png"
                                                fill
                                                alt=""
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-sm text-zinc-200 font-medium text-center" >Certificate of completion</h3>
                                </div>
                                <div className="w-full p-4 rounded-md border border-zinc-600 space-y-2 border-l-4">
                                    <div className="flex items-center justify-center">
                                        <div className="w-1/3 aspect-square relative">
                                            <Image
                                                src="/assets/cellphone.png"
                                                fill
                                                alt=""
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-sm text-zinc-200 font-medium text-center" >Access on mobile and TV</h3>
                                </div>
                                <div className="w-full p-4 rounded-md border border-zinc-600 space-y-2 border-l-4">
                                    <div className="flex items-center justify-center">
                                        <div className="w-1/3 aspect-square relative">
                                            <Image
                                                src="/assets/download.png"
                                                fill
                                                alt=""
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-sm text-zinc-200 font-medium text-center" >
                                        <span className="mr-1">
                                            {course.chapters.reduce((total, item)=>{ return item._count.attachments+total }, 0)}
                                        </span>
                                        downloadable resources
                                    </h3>
                                </div>
                                <div className="w-full p-4 rounded-md border border-zinc-600 space-y-2 border-l-4">
                                    <div className="flex items-center justify-center">
                                        <div className="w-1/3 aspect-square relative">
                                            <Image
                                                src="/assets/hourglass.png"
                                                fill
                                                alt=""
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-sm text-zinc-200 font-medium text-center" >Full lifetime access</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CoursePage;