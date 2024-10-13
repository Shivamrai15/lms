"use client";

import { TimeSpent } from "@/server/dashboard";
import { 
    CartesianGrid,
    Line,
    LineChart,
    XAxis 
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

const chartConfig = {
    desktop: {
        label: "Time Spent (Minutes)",
        color: "hsl(var(--chart-6))",
    },
} satisfies ChartConfig;

interface GraphChartProps {
    data: TimeSpent[];
}

export const GraphChart = ({
    data
}: GraphChartProps) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Time Spent By You</CardTitle>
                <CardDescription>Last 7 Days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="time"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total time spent for the last 7 days
                </div>
            </CardFooter>
        </Card>
    );
};
