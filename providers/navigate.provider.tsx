"use client";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface NavigateProviderProps {
    session : Session|null
}

export const NavigateProvider = ({
    session
}:NavigateProviderProps) => {

    const router = useRouter();

    if (session && session.user.role === "TUTOR") {
        router.push("/tutor/courses")
    }

    if (session && !session.user.profile ) {
        router.push("/profile");
    }

    return null;
}
