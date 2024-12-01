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
import "./style.css"
import { InstructorDescription } from "@/components/courses/ui/instructor-description";
import { Reviews } from "@/components/courses/ui/reviews";


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
    
    const { course, avgRating } = await getCourseByPublicId(params.courseId);
    if (!course) {
        redirect("/");
    }

    return (
        <main className="h-full overflow-y-auto">
            <Header variant="default" />
            <CourseHeader
                id={course.id}
                title={course.title}
                shortDescription={course.shortDescription!}
                lastUpdated={course.updatedAt}
                subCategory={course.subCategory}
                tutorImage={course.tutor.image}
                tutorName={course.tutor.name!}
                tutorProfile={course.tutor.profile?.description}
                avgRating={avgRating._avg.star!}
                purchases={course._count.purchases}
                ratings={course._count.ratings}
            />
            <div className="w-full mt-20">
                <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row mx-auto px-6 gap-10 relative">
                    <div className="w-full">
                        <div className="gap-y-4 px-6 py-10 border border-zinc-300 rounded-xl shadow-md">
                            <h1 className="text-zinc-600 font-semibold">Top companies offer this course to their employees</h1>
                            <div className="grid grid-cols-4 items-center justify-items-center ">

                            </div>
                        </div>
                        <Chapters chapters={course.chapters} />
                        <Description description={course.description!} />
                        <InstructorDescription tutor={course.tutor} />
                        <Reviews reviews={course.ratings} courseId={course.id}  />
                    </div>
                    <SubscriptionCard
                        courseId={params.courseId}
                        title={course.title}
                        poster={course.image!}
                        price={course.price!}
                        course={course}
                    />
                </div>
            </div>
        </main>
    )
}

export default CoursePage;