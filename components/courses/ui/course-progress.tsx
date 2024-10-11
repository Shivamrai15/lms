import { Progress } from "@/components/ui/custom-progress";
import { cn } from "@/lib/utils";


interface CourseProgressProps {
    value: number;
    variant : "default" | "success";
    size? : "default" | "sm";
}

const colorByVariant = {
    default : "text-violet-400",
    success : "text-emerald-400"
}

const sizeByVariant = {
    default : "text-sm",
    sm : "text-xs"
}

export const CourseProgress = ({
    size,
    value,
    variant
} : CourseProgressProps ) => {
    return (
        <div>
            <Progress
                className="bg-neutral-700"
                value={value}
                variant={variant}
            />
            <p className={cn(
                "font-medium mt-2 text-violet-600",
                colorByVariant[variant||"default"],
                sizeByVariant[size || "default"]
            )}>
                {Math.round(value)}% complete
            </p>
        </div>
    )
}
