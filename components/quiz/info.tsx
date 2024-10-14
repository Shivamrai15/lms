import { LucideIcon } from "lucide-react";
import { IconBage } from "../ui/icon-badge";

interface InfoCardProps {
    label : string;
    value: number;
    icon : LucideIcon;
    variant : "default" | "success"
}

export const InfoCard = ({
    icon,
    label,
    value,
    variant
} : InfoCardProps) => {
    return (
        <div className="border rounded-md flex items-center gap-x-6 p-3 border-zinc-300 border-l-4 shadow-sm">
            <div className="h-10 w-10 shrink-0 relative">
                <IconBage icon={icon} iconVariant ={variant} />
            </div>
            <div className="flex flex-col text-sm">
                <h1 className="text-lg font-semibold text-zinc-700">{label}</h1>
                <span className="text-zinc-600 font-medium" >{value} {value===1?"Question" :"Questions"}</span>
            </div>
        </div>
    )
}
