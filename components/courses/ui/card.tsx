"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { Course } from "@prisma/client";
import { MdOutlineShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { X } from "lucide-react";

interface CardProps {
    course : (Course );
    isBestSeller? : boolean;
    className? : string;
    remove?: boolean;
}

export const Card = ({
    course,
    isBestSeller,
    className,
    remove
} : CardProps ) => {

    const router = useRouter();
    const { items, toggleItem } = useCart();

    return (
        <div
            className={cn(
                "w-72 md:w-80 space-y-6 p-3 pb-6 bg-white shadow-md border rounded-md group",
                className
            )}
            onClick={()=>router.push(`/course/${course.id}`)}
        >
            <div className="w-full aspect-video rounded-md overflow-hidden relative">
                <Image
                    src={course.image!}
                    alt="Image"
                    fill
                    className="object-contain"
                />
                {
                    remove ? (
                        <div className="absolute right-3 top-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-white"
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    // toggleItem(course);
                                    toast.info("Course is removed from cart");
                                }}
                            >
                                <X className="text-zinc-800 h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <div className="absolute right-4 bottom-4 hidden group-hover:block">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-white"
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    toast.info(items.find(item=>item.id===course.id) ? "Course is removed from cart" : "Course is added to cart")
                                    // toggleItem(course);
                                }}
                            >
                                { items.find(item=>item.id===course.id) ? (<MdOutlineRemoveShoppingCart className="text-zinc-800 h-6 w-6"/>): (<MdOutlineShoppingCart className="text-zinc-800 h-6 w-6"/>)}
                            </Button>
                        </div>
                    )
                }
            </div>
            <div className="w-full space-y-3 px-3">
                <h2 className="font-semibold text-zinc-700 line-clamp-2 text-base">{course.title}</h2>
                <p className="font-medium text-emerald-600">
                    {formatPrice(course.price!)}
                </p>
                {
                    isBestSeller && (
                        <span className="block px-2 py-1.5 bg-yellow-300 w-fit text-xs font-medium rounded-full border-b-2 border-yellow-800">
                            Bestseller
                        </span>
                    )
                }
            </div>
        </div>
    )
}
