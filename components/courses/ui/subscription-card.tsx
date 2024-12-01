"use client";

import Image from "next/image";
import { useState } from "react";

import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { CouponCheckoutForm } from "@/components/checkout/coupon-checkout-form";
import { useCart } from "@/hooks/use-cart";
import { Course } from "@prisma/client";


interface SubscriptionCardProps {
    courseId: string;
    poster: string;
    video?: string;
    price: number;
    title: string;
    course: Course
}

export const SubscriptionCard = ({
    courseId,
    poster,
    price,
    video,
    title,
    course
}: SubscriptionCardProps ) => {

    const [appliedPrice, setAppliedPrice] = useState(price);
    const { items, toggleItem } = useCart();

    return (
        <div className="w-full md:w-96 h-fit shrink-0 md:sticky md:top-10 pb-8 border border-zinc-200 shadow-xl">
            <div className="aspect-video w-full relative">
                <Image
                    src={poster}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>
            <div className="mt-6 px-6 w-full">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h3 className="text-xl md:text-2xl text-zinc-700 font-bold" >{formatPrice(appliedPrice)}</h3>
                        <Button 
                            className="w-full h-12 border-2 border-zinc-600 rounded-none font-semibold text-zinc-800"
                            variant="outline"
                            // onClick={()=>toggleItem(course)}
                        >
                            {
                                items.find(item=>item.id===courseId)  ? "Remove from cart" : "Add to cart"
                            }
                        </Button>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <div className="absolute h-0.5 w-full bg-zinc-300" />
                        <span className="text-xs z-10 bg-white font-medium text-zinc-700 px-2">OR</span>
                    </div>
                    <CouponCheckoutForm
                        courseId={courseId}
                        price={appliedPrice}
                        setPrice={(price:number)=>setAppliedPrice(price)}
                        title={title}
                        currentPrice={price}
                    />
                </div>
            </div>
        </div>
    )
}
