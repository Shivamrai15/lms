"use client";

import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface OauthButtonProps {
    provider : "google"|"github";
    title : string;
    Icon : IconType;
    redirect : string;
}

export const OauthButton = ({
    title,
    provider,
    Icon,
    redirect
} : OauthButtonProps) => {


    const handleOauth = async () => {
        try {
            await signIn(provider, {
                redirect : true,
                callbackUrl : redirect
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            className="h-14 border-zinc-400 border-2 rounded-none text-lg font-semibold text-zinc-600 hover:text-zinc-600"
            variant="outline"
            size="lg"
            onClick={handleOauth}
        >
            <Icon className="h-5 w-5 mr-3" />
            <span>
                {title}
            </span>
        </Button>
    )
}
