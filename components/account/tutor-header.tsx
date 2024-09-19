import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Sidebar } from "../utils/sidebar";
import { AlignJustify } from "lucide-react";

export const TutorHeader = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <AlignJustify/>
            </SheetTrigger>
            <SheetContent className="bg-neutral-800 px-0 pt-10 border-none" side="left" >
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}
