"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export const Header = () => {

    const router = useRouter();
    const session = useSession();

    return (
        <header className="h-20 flex items-center justify-between px-4 md:px-10 border-b shadow-md">
            <div>
                <div className="h-8 aspect-square relative overflow-hidden"
                    onClick={()=>router.push("/")}
                >
                    <Image
                        src="/assets/icon.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            <div className="flex items-center">
                
                {
                    session.status === "unauthenticated" ? (
                        <Button
                            onClick={()=>router.push("/login")}
                            className="bg-neutral-800 rounded-none"
                        >
                            Login
                        </Button>
                    ) : (
                        <div className="flex items-center gap-x-4">
                            {
                                session.data?.user.role === "TUTOR" && (
                                    <Button
                                        onClick={()=>router.push("/tutor/courses")}
                                        className="bg-neutral-800 rounded-none"
                                    >
                                        Dashboard
                                    </Button>
                                )
                            }
                            <Avatar>
                                <AvatarImage src={session.data?.user.image||""} />
                                <AvatarFallback>{session.data?.user.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                    )
                }
            </div>
        </header>
    )
}
