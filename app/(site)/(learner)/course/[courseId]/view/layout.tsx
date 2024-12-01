import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { MobileSidebar } from "@/components/courses/ui/mobile-sidebar";
import { SideBar } from "@/components/courses/ui/sidebar";
import { getCourseAndProgress } from "@/server/course";
import { getUserProgressCount } from "@/server/progress";
import { db } from "@/lib/db";


export const metadata : Metadata = ({
    title : ""
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
        redirect("/login");
    }

    const course = await getCourseAndProgress(params.courseId, session.user.id!);

    if (!course) {
        redirect("/");
    }

    const progressCount = await getUserProgressCount(session.user.id!, course.id);

    const purchase = await db.purchase.findUnique({
        where : {
            userId_courseId : {
                userId : session.user.id!,
                courseId : course.id
            }
        }
    });

    return (
        <>
            <MobileSidebar
                course={course}
                progressCount={progressCount}
                purchase={purchase}
            />
            <div className="h-full w-full flex">
                <div className="hidden md:flex h-full w-80 flex-col shrink-0">
                    <SideBar
                        course={course}
                        progressCount={progressCount}
                        purchase={purchase}
                    />
                </div>
                <main className="h-full overflow-y-auto w-full lg:w-[clac(100%-20rem)]">
                    { children }
                </main>
            </div>
        </>
    )
}

export default ViewLayoutPage