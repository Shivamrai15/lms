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

    if (session && !session.user.profile ) {
        router.push("/user");
    }

    return null;
}
