"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Stars } from "@/components/rating/stars";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Course } from "@/types";
import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from "react-icons/md";
import { toast } from "sonner";


interface CardWithRatingProps {
    className?: string;
    course: Course;
    isBestSeller?: boolean;
}

export const CardWithRating = ({
    className,
    course,
    isBestSeller
}: CardWithRatingProps ) => {


    const router = useRouter();
    const { items, toggleItem } = useCart();

    return (
        <div
            className={cn(
                "w-72 md:w-80 space-y-6 relative z-10 md:hover:scale-105 transition-all group duration-300",
                className
            )}
            onClick={()=>router.push(`/course/${course.id}`)}
        >   
            <div className="absolute bg-white inset-px rounded-md shadow-sm group-hover:shadow-lg ring-1 ring-black/5"/>
            <div className="relative rounded-md p-3 space-y-4 z-10 pb-6">
                <div className="w-full relative aspect-video rounded-sm overflow-hidden">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover object-center"
                    />
                    <div className="absolute right-4 bottom-4 hidden group-hover:block">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white"
                            onClick={(e)=>{
                                e.stopPropagation();
                                toast.info(items.find(item=>item.id===course.id) ? "Course is removed from cart" : "Course is added to cart")
                                toggleItem(course);
                            }}
                        >
                            { items.find(item=>item.id===course.id) ? (<MdOutlineRemoveShoppingCart className="text-zinc-800 h-6 w-6"/>): (<MdOutlineShoppingCart className="text-zinc-800 h-6 w-6"/>)}
                        </Button>
                    </div>
                </div>
                <div className="px-2">
                    <h1 className="line-clamp-2 text-zinc-800 font-medium">{course.title}</h1>
                    <h2 className="mt-2 text-sm text-zinc-700">
                        {course.tutor_name}
                    </h2>
                    <div className="flex items-center gap-x-3 mt-4">
                        <span className="text-zinc-700 font-[600]">{Number(course.average_rating).toFixed(1)}</span>
                        <Stars avgRating={course.average_rating} />
                        <span className="text-zinc-700">({course.total_purchases})</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-[600] text-emerald-600 mt-2">
                            {formatPrice(course.price)}
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
            </div>
        </div>
    )
}
