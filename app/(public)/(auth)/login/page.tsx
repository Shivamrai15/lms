"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { OauthButton } from "@/components/auth/oauth-btn";

const LoginPage = () => {
    return (
        <div className="w-full space-y-10 md:space-y-16">
            <h2 className="text-xl md:text-3xl font-bold text-zinc-800">
                Log in to continue your learning journey
            </h2>
            <div className="flex flex-col gap-3">
                <OauthButton
                    title="Google"
                    provider="google"
                    Icon={FcGoogle}
                    redirect="/"
                />
                <OauthButton
                    title="Github"
                    provider="github"
                    Icon={FaGithub}
                    redirect="/"
                />
            </div>
            <Link
                href="/register"
                className="text-zinc-700 font-semibold block"
            >
                Don't have an account? <span className="text-blue-600 font-bold">Sign up</span>
            </Link>
        </div>
    )
}

export default LoginPage