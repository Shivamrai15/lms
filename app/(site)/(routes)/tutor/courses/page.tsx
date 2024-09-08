import { auth } from "@/auth";
import { CourseTutorCard } from "@/components/courses/ui/course-tutor-card";
import { getCoursesByTutorId } from "@/server/course";
import { redirect } from "next/navigation";

const CoursesPage = async() => {

    const session = await auth();

    if (!session){
        return redirect("/");
    }

    const courses = await getCoursesByTutorId(session.user.id!);
    if ( courses.length === 0 ) {
        <div className="flex items-center justify-center text-sm text-muted-foreground">
            There are no courses
        </div>
    }

    return (
        <div className="p-6 md:px-8 space-y-10">
            <h1 className="text-xl md:text-2xl font-bold text-zinc-800">
                Your Courses
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {
                    courses.map((course)=>(
                        <CourseTutorCard
                            course={course}
                            key={course.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default CoursesPage