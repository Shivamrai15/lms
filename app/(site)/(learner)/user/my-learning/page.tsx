import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { CompletedChaptersChart } from "@/components/dashboard/completed-chapters-chart";
import { CoursesProgress } from "@/components/dashboard/courses-progress";
import { TimeChart } from "@/components/dashboard/time-chart";


export const metadata : Metadata = {
    title : "My learning"
}

const MyLearningPage = async() => {
    
    const session = await auth();
    if (!session || !session.user.id) {
        return redirect("");
    }
    
    return (
        <div>
            <CoursesProgress userId={session.user.id} />
            <CompletedChaptersChart userId={session.user.id} />
            <TimeChart userId={session.user.id}  />
        </div>
    )
}

export default MyLearningPage;