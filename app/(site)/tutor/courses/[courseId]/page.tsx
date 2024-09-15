import { auth } from "@/auth"
import { redirect } from "next/navigation";

import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { getCourseById } from "@/server/course";
import { IconBage } from "@/components/ui/icon-badge";
import { Progress } from "@/components/ui/progress";
import { TitleForm } from "@/components/courses/forms/title.form";
import { DescriptionForm } from "@/components/courses/forms/description.form";
import { ImageForm } from "@/components/courses/forms/image.form";
import { getAllCategories } from "@/server/category";
import { CategoryForm } from "@/components/courses/forms/category.form";
import { PriceForm } from "@/components/courses/forms/price.form";
import { ChaptersForm } from "@/components/courses/forms/chapters.form";
import { Banner } from "@/components/utils/banner";
import { Actions } from "@/components/courses/actions/actions";
import { ShortDescriptionForm } from "@/components/courses/forms/short-description.form";
import { CouponForm } from "@/components/courses/forms/coupon.form";


interface CoursePageProps {
    params : {
        courseId : string
    }
}

export const revalidate = 0;

const CoursePage = async({
    params
} : CoursePageProps ) => {
    
    const session = await auth();

    if (!session){
        return redirect("/");
    }

    const course = await getCourseById(params.courseId);
    if ( !course || course.tutorId !== session.user.id ){
        return redirect("/");
    }

    const categories = await getAllCategories();

    const requiredFields = [
        course.title,
        course.image,
        course.description,
        course.price,
        course.subCategoryId,
        course.shortDescription,
        course.chapters.some((chapter)=>chapter.isPublished)
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`

    return (
        <>
            {
                !course.isPublished && (
                    <Banner variant="warning" label="This course is unpublished." />
                )
            }
            <div className="p-6 md:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-xl md:text-2xl font-bold text-zinc-800">
                            Course Setup
                        </h1>
                        <div className="flex flex-col gap-y-2">
                            <span className="text-sm text-zinc-600 font-medium">Complete all fields {completionText}</span>
                            <Progress value={(completedFields/totalFields)*100} className="max-w-sm w-full" />
                        </div>
                    </div>
                    <Actions
                        courseId={params.courseId}
                        isPublished = {course.isPublished}
                        disabled = {totalFields!==completedFields}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-x-12 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBage icon={LayoutDashboard} />
                            <h2 className="text-lg md:text-xl text-zinc-700 font-semibold">
                                Customize your course
                            </h2>
                        </div>
                        <TitleForm
                            initialData = {course}
                            courseId = {course.id}
                        />
                        <ShortDescriptionForm
                            initialData = {course}
                            courseId = {course.id}
                        />
                        <DescriptionForm
                            initialData = {course}
                            courseId = {course.id}
                        />
                        <ImageForm
                            initialData = {course}
                            courseId = {course.id}
                        />
                        <CategoryForm
                            initialData = {course}
                            courseId = {course.id}
                            options={categories.map((category)=>({
                                label : category.name,
                                value : category.id,
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBage icon={ListChecks} />
                                <h2 className="text-lg md:text-xl text-zinc-700 font-semibold">
                                    Course chapters
                                </h2>
                            </div>
                            <ChaptersForm
                                initialData = {course}
                                courseId = {course.id}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBage icon={CircleDollarSign} />
                                <h2 className="text-lg md:text-xl text-zinc-700 font-semibold">
                                    Sell your course
                                </h2>
                            </div>
                            <PriceForm
                                initialData = {course}
                                courseId = {course.id}
                            />
                            <CouponForm
                                initialData = {course}
                                courseId = {course.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoursePage;