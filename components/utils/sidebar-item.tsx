"use client";

import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    label : string;
    href : string;
    Icon : LucideIcon;
    active : boolean;
}
export const SidebarItem = ({
    label,
    href,
    active,
    Icon,
}:SidebarItemProps) => {
    
    const router = useRouter();
    
    return (
        <li
            onClick={()=>router.push(href)}
            role="button"
            className={cn(
                "flex items-center gap-x-2 text-zinc-300 text-sm font-medium pl-5 hover:text-zinc-200 hover:bg-neutral-700/80",
                active && "text-violet-500 bg-violet-600/10 hover:bg-violet-600/10 hover:text-violet-500 border-r-4 border-violet-500"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon  className="h-5 w-5" />
                {label}
            </div>
        </li>
    )
}
