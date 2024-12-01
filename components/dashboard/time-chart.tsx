import { timeSpendByUser } from "@/server/dashboard";
import { GraphChart } from "./graph-chart";

interface TimeChartProps {
    userId: string;
}

export const TimeChart = async({
    userId
}: TimeChartProps) => {
    
    const data = await timeSpendByUser(userId);

    if (!data) {
        return null;
    }

    return (
        <div className="max-w-5xl w-full py-10 md:py-24 mx-auto px-6">
            <GraphChart data={data} />
        </div>
    )
}
