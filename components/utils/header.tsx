"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/account/user-avatar";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";


interface HeaderProps {
    variant : "default" | "ghost" 
}


export const Header = ({
    variant
} : HeaderProps ) => {

    const router = useRouter();
    const session = useSession();
    const pathname = usePathname();

    return (
        <header className="h-20 flex items-center justify-between px-4 md:px-10 bg-zinc-300/10 z-20">
            <div>
                <div className="h-10 aspect-square relative overflow-hidden md:cursor-pointer"
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
            <div className="flex items-center gap-x-4">
                <Button
                    className={cn(
                        "rounded-none",
                        pathname === "/" && "bg-transparent text-white hover:text-white hover:bg-transparent text-lg"
                    )}
                    variant="ghost"
                    size="icon"
                >
                    <ShoppingCart className="h-6 w-6"/>   
                </Button>
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
