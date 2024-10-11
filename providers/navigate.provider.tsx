"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";

interface NavigateProviderProps {
    session : Session|null
}

export const NavigateProvider = ({
    session
}:NavigateProviderProps) => {

    const router = useRouter();
    const pathname = usePathname();

    if (session && session.user.role === "TUTOR" && !pathname.includes("/tutor")) {
        router.push("/tutor/courses")
    }

    if (session && !session.user.profile ) {
        router.push("/user");
    }

    return null;
}
