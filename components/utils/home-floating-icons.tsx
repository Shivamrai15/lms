"use client";

import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";


const Icons = [
    "/assets/Icons/file-type-css.svg",
    "/assets/Icons/adobe-xd.svg",
    "/assets/Icons/mongodb-original-wordmark.svg",
    "/assets/Icons/angularjs-original.svg",
    "/assets/Icons/adobe-premiere.svg",
    "/assets/Icons/react.svg",
    "/assets/Icons/adobe-after-effects.svg",
    "/assets/Icons/django.svg",
    "/assets/Icons/git.svg",
    "/assets/Icons/github.svg",
    "/assets/Icons/java-original.svg",
    "/assets/Icons/file-type-light-prisma.svg",
    "/assets/Icons/postgresql.svg",
    "/assets/Icons/aws.svg",
    "/assets/Icons/python.svg",
    "/assets/Icons/nextjs.svg",
    "/assets/Icons/adobe-illustrator.svg",
    "/assets/Icons/figma.svg",
    "/assets/Icons/spring.svg",
    "/assets/Icons/docker.svg",
    "/assets/Icons/javascript.svg",
    "/assets/Icons/typescript-icon.svg",
    "/assets/Icons/html5.svg",
    "/assets/Icons/kubernetes.svg",
    "/assets/Icons/adobe-photoshop.svg",
    "/assets/Icons/nodejs.svg",
    "/assets/Icons/fastapi.svg"
];


export const HomeFloatingIcons = () => {
    return (
        <div className="h-full flex gap-x-6 justify-center relative">
            <div className="w-72">
                <Marquee pauseOnHover vertical className="[--duration:40s]">
                    {Icons.map((src, index) => (
                        <div
                            key={src}
                            className={cn(
                                "w-full shrink-0 my-2 rounded-sm flex items-center",
                                index%3===0 && "justify-start",
                                index%3==1 && "justify-center",
                                index%3==2 && "justify-end"
                            )}
                        >
                            <div className="relative h-24 w-24 hover:scale-110 duration-300 transition-all">
                                <Image
                                    src={src}
                                    fill
                                    alt="Icon"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    )
}
