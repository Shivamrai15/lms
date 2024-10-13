import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getAnalytics } from "@/server/analytics";
import { DataCard } from "@/components/dashboard/data-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";

export const metadata: Metadata = {
    title : 'Analytics'
}

const AnalyticPage = async() => {
    
    const session = await auth();
    if (!session || !session.user.id) {
        return redirect("/");
    }

    const { data, totalRevenue, totalSales } = await getAnalytics(session.user.id);
    
    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard
                    label="Total Sales"
                    value={totalSales}
                />
                <DataCard
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                />
            </div>
            <RevenueChart data={data} />
        </div>
    )
}

export default AnalyticPage;