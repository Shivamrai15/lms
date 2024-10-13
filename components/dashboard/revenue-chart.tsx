"use client";

import {
    Card
} from "@/components/ui/card"

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";

interface RevenueChartProps {
    data : {
        name : string;
        total : number;
    }[]
}

export const RevenueChart = ({
    data
}: RevenueChartProps ) => {
    return (
        <Card>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} >
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value)=>(`Rs ${value}`)}
                    />
                    <Bar 
                        dataKey="total"
                        fill="#b224f9"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>

            </ResponsiveContainer>
        </Card>
    )
}
