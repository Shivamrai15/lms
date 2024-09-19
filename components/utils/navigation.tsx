"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Navigation = () => {
    
    const router = useRouter();
    
    return (
        <div className="flex items-center gap-x-3">
            <Button
                className="rounded-full bg-neutral-100"
                size="icon"
                variant="outline"
                onClick={()=>router.forward()}
            >
                <ChevronLeft />
            </Button>
            <Button
                className="rounded-full bg-neutral-100"
                size="icon"
                variant="outline"
                onClick={()=>router.back()}
            >
                <ChevronRight />
            </Button>
        </div>
    )
}
