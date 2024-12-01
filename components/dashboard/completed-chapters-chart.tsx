import { chaptersCompletedInPast } from "@/server/dashboard";
import { ChaptersChart } from "./chapters-chart";

interface CompletedChaptersChartProps {
    userId: string;
}

export const CompletedChaptersChart = async({
    userId
}: CompletedChaptersChartProps ) => {
    
    const data = await chaptersCompletedInPast(userId);

    if (!data) {
        return null;
    }

    return (
        <div className="max-w-5xl w-full py-10 md:py-24 mx-auto px-6">
            <ChaptersChart data={data} />
        </div>
    )
}
