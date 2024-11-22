import { EB_Garamond } from "next/font/google";


import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const eb_garamond = EB_Garamond({
    subsets: ["latin"],
    variable: "--font-heading",
});

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children ?: React.ReactNode;
}


export const Heading = ({
    className,
    children,
    ...props
}: HeadingProps) => {
    
    return (
        <h1
            className={cn(
                "text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800",
                className,
                eb_garamond.className
            )}
            {...props}
        >
            {children}
        </h1>
    )
}
