"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/account/user-avatar";
import { cn } from "@/lib/utils";
import { LibraryBig, ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useSidebar } from "@/hooks/use-sidebar";


interface HeaderProps {
    variant : "default" | "ghost" 
}


export const Header = ({
    variant
} : HeaderProps ) => {

    const router = useRouter();
    const session = useSession();
    const pathname = usePathname();
    const { items } = useCart();
    const { onOpen } = useSidebar();

    return (
        <header className={cn(
            "h-20 flex items-center justify-between px-4 md:px-10 bg-zinc-300/10 z-20",
            pathname !== "/" && "shadow-md"
        )}>
            <div>
                <LibraryBig
                    className={cn(
                        "size-10 hidden md:hidden text-zinc-900",
                        pathname.includes("/course") && pathname.includes("/view") && "block"
                    )}
                    onClick={()=>onOpen()}
                />
                <div 
                    className={cn(
                        "h-10 aspect-square max-md:hidden relative overflow-hidden md:cursor-pointer",
                        !(pathname.includes("/course") && pathname.includes("/view")) && "max-md:block"
                    )}
                    onClick={()=>router.push("/")}
                >
                    <Image
                        src={ variant === "ghost" ? "/assets/logo-white.png" : "/assets/logo-black.png"}
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-6">
                <div className="relative">
                    <Button
                        className={cn(
                            "rounded-none",
                            pathname === "/" && "bg-transparent text-white hover:text-white hover:bg-transparent text-lg"
                        )}
                        variant="ghost"
                        size="icon"
                        onClick={()=>router.push("/cart")}
                    >
                        <ShoppingCart className="h-6 w-6"/>   
                    </Button>
                    <Badge className="absolute -right-3 -top-2 select-none">
                        {items.length}
                    </Badge>
                </div>
                {
                    session.status === "unauthenticated" ? (
                        <Button
                            onClick={()=>router.push("/login")}
                            className={cn(
                                "bg-neutral-800 rounded-none",
                                pathname === "/" && "bg-transparent text-white hover:bg-transparent text-lg"
                            )}
                        >
                            Login
                        </Button>
                    ) : (
                        <div className="flex items-center gap-x-4">
                            {
                                session.data?.user.role === "TUTOR" && (
                                    <Button
                                        onClick={()=>router.push("/tutor/courses")}
                                        className={cn(
                                            "bg-neutral-800 rounded-none",
                                            pathname === "/" && "bg-transparent text-white hover:bg-transparent text-lg"
                                        )}

                                    >
                                        Dashboard
                                    </Button>
                                )
                            }
                            <UserAvatar/>
                        </div>
                    )
                }
            </div>
        </header>
    )
}
