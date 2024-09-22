import { auth } from "@/auth";
import { SideBar } from "@/components/courses/ui/sidebar";
import { getCourseAndProgress } from "@/server/course";
import { getUserProgressCount } from "@/server/progress";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata : Metadata = ({
    title : "Admin Dashboard"
});

interface ViewLayoutPageProps {
    params : { courseId : string }
    children : React.ReactNode;
}
const ViewLayoutPage = async({
    params,
    children
} : ViewLayoutPageProps) => {

    const session = await auth();
    if (!session) {
        redirect("/");
    }

    const course = await getCourseAndProgress(params.courseId, session.user.id!);

    if (!course) {
        redirect("/");
    }

    const progressCount = await getUserProgressCount(session.user.id!, course.id);

    return (
        <div className="h-full w-full flex">
            <div className="hidden md:flex h-full w-80 flex-col shrink-0">
                <SideBar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="h-full overflow-y-auto w-full lg:w-[clac(100%-20rem)]">
                { children }
            </main>
        </div>
    )
}

export default ViewLayoutPage