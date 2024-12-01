"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
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
import { ChapterCompletion } from "@/server/dashboard";
import { Heading } from "../utils/heading";

const chartConfig = {
    desktop: {
        label: "Chapters",
        color: "hsl(var(--chart-6))",
    },
} satisfies ChartConfig;

interface ChaptersChartProps {
    data: ChapterCompletion[];
}

export const ChaptersChart = ({ data }: ChaptersChartProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-zinc-700" >
                    <Heading className="md:text-4xl font-[600]">
                        Chapters Completed
                    </Heading>
                </CardTitle>
                <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="chapters" fill="var(--color-desktop)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing chapters completed in the last 7 days
                </div>
            </CardFooter>
        </Card>
    );
};
