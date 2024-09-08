"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { OauthButton } from "@/components/auth/oauth-btn";

const RegisterPage = () => {
    return (
        <div className="w-full space-y-10 md:space-y-16">
            <h2 className="text-xl md:text-3xl font-bold text-zinc-800">
                Sign up and start learning
            </h2>
            <div className="flex flex-col gap-3">
                <OauthButton
                    title="Google"
                    provider="google"
                    Icon={FcGoogle}
                    redirect="/profile"
                />
                <OauthButton
                    title="Github"
                    provider="github"
                    Icon={FaGithub}
                    redirect="/profile"
                />
            </div>
            <Link
                href="/login"
                className="text-zinc-700 font-semibold block"
            >
                Already have an account? <span className="text-blue-600 font-bold">Log in</span>
            </Link>
        </div>
    )
}

export default RegisterPage