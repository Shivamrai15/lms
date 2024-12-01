import { getDashboardCourses } from "@/server/dashboard";
import { ProgressCard } from "./progress-card";
import { InfoCard } from "./info-card";


interface CoursesProgressProps {
    userId : string;
}

export const CoursesProgress = async({
    userId
} : CoursesProgressProps ) => {
    
    const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);
    
    return (
        <div className="max-w-5xl w-full mx-auto py-10 md:py-24 px-6">
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <InfoCard
                    label="In Progress"
                    numberOfItems={coursesInProgress.length}
                    src="/assets/clock.png"
                />
                <InfoCard
                    label="Completd"
                    numberOfItems={completedCourses.length}
                    src="/assets/checked.png"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-6">
                {
                    [...completedCourses, ...coursesInProgress].map((course)=>(
                        <ProgressCard key={course.id} course={course} />
                    ))
                }
            </div>
        </div>
    )
}
