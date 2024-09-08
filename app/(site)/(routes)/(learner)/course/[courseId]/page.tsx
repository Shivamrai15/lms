import { getUserById } from "@/lib/user";
import { redirect } from "next/navigation";
import { Chapters } from "@/components/courses/ui/chapters";
import { Description } from "@/components/courses/ui/description";
import { Header } from "@/components/courses/ui/header";
import { getCourseByPublicId } from "@/server/course";
import { auth } from "@/auth";

interface CoursePageProps {
    params : {courseId: string};
}

const CoursePage = async({
    params
}:CoursePageProps ) => {
    
    const course = await getCourseByPublicId(params.courseId);
    if (!course) {
        redirect("/");
    }

    const tutor = await getUserById(course.tutorId);
    if (!tutor) {
        redirect("/");
    }

    return (
        <main className="w-full pb-6">
            <Header
                course={course}
                tutor={tutor}
            />
            <Chapters chapters = {course.chapters} />
            <Description description={course.description!} />
        </main>
    )
}

export default CoursePage;