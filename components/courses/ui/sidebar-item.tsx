"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    id: string;
    label : string;
    isCompleted : boolean,
    courseId: string;
    isLocked : boolean
}

export const SidebarItem = ({
    courseId,
    id,
    isCompleted,
    isLocked,
    label
} : SidebarItemProps ) => {

    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);

    const active = pathname.includes(id);

    const onClick = () => {
        router.push(`/course/${courseId}/view/chapter/${id}`);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-zinc-300 text-sm font-medium transition-all hover:text-zinc-200 hover:bg-neutral-700",
                active && "text-zinc-100 hover:text-white bg-neutral-700 hover:bg-neutral-700",
                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && active && "bg-emerald-700/30"
            )}
        >
            <div className="flex items-center gap-x-3 p-4">
                <Icon
                    className="h-5 w-5"
                />
                {label}
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-zinc-200 h-full transition-all",
                active && "opacity-100",
                isCompleted && "border-emerald-700"
                )}
            />
        </button>
    )
}
