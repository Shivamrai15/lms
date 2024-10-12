"use client"

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const EditItems = () => {
    
    const router = useRouter();
    const pathname = usePathname();

    const items = useMemo(()=>[
        {
            label : "Basics",
            href : "/user/edit-profile",
            active : pathname === "/user/edit-profile"
        },
        {
            label : "Social Account",
            href : "/user/edit-profile/social",
            active : pathname === "/user/edit-profile/social"
        },
    ], [pathname]);
    
    return (
        <div className="w-full h-full">
            {
                items.map((item)=>(
                    <div
                        key={item.label}
                        className={cn(
                            "py-4 px-6 text-zinc-300 font-medium border-l-4 border-transparent cursor-default md:cursor-pointer",
                            item.active && "bg-neutral-700 text-white border-violet-500"
                        )}
                        onClick={()=>router.push(item.href)}
                    >
                        {item.label}
                    </div>
                ))
            }
        </div>
    )
}
