"use client";

import { signOut, useSession } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { GraduationCap, LogOut, ShoppingBag, User, } from "lucide-react";
import { TbUserEdit } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const UserAvatar = () => {
    
    const session = useSession();
    const router = useRouter();
    const pathname = usePathname();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:cursor-pointer">
                <Avatar>
                    <AvatarImage src={session.data?.user.image||""} />
                    <AvatarFallback>{session.data?.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 md:w-72 rounded-none border border-zinc-400 pb-4" align="end" >
                <div className="p-3 flex items-center gap-x-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={session.data?.user.image||""} />
                        <AvatarFallback>{session.data?.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="w-[calc(100%-4.75rem)]">
                        <h2 className="font-bold text-zinc-800 line-clamp-1">{session.data?.user.name}</h2>
                        <p className="text-zinc-700 text-xs truncate" >{session.data?.user.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="rounded-none font-medium text-zinc-700 py-2"
                    onClick={()=>router.push("/user")}
                >
                    <User className="mr-3 h-5 w-5" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="rounded-none font-medium text-zinc-700 py-2"
                    onClick={()=>router.push("/user/edit-profile")}
                >
                    <TbUserEdit className="mr-3 h-5 w-5" />
                    <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn(
                        "rounded-none font-medium text-zinc-700 py-2",
                        pathname.includes("/tutor/courses") && "hidden"
                    )}
                    onClick={()=>router.push("/orders/courses")}
                    
                >
                    <GraduationCap className="mr-3 h-5 w-5" />
                    <span>My Courses</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn(
                        "rounded-none font-medium text-zinc-700 py-2",
                        pathname.includes("/tutor/courses") && "hidden"
                    )}
                    onClick={()=>router.push("/orders")}
                >
                    <ShoppingBag className="mr-3 ml-1 h-4 w-4" />
                    <span>Cart</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="rounded-none font-medium text-zinc-700 py-2"
                    onClick={async()=>{
                        await signOut();
                    }}
                >
                    <LogOut className="mr-3 ml-1 h-4 w-4" />
                    <span>Log Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
