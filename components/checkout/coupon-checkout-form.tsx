"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CouponSchema } from "@/schemas/coupon-checkout.scheama";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CourseEnrollButton } from "@/components/utils/course-enroll-button";


interface CouponCheckoutFormProps {
    courseId : string;
    price : number;
    title : string;
    setPrice : (price: number)=>void;
    currentPrice: number;
}


export const CouponCheckoutForm = ({
    courseId,
    price,
    title,
    setPrice,
    currentPrice
} : CouponCheckoutFormProps ) => {

    
    const [appliedCoupon, setAppliedCoupon] = useState<string|undefined>();
    const [isLoading, setIsLoading] = useState(false);
    
    const form = useForm<z.infer<typeof CouponSchema>>({
        resolver : zodResolver(CouponSchema),
        defaultValues : {
            coupon : ""
        }
    });


    const { isValid } = form.formState;

    const onSubmit = async(value: z.infer<typeof CouponSchema>)=>{
        try {
            
            setIsLoading(true)
            const response = await axios.get(`/api/courses/${courseId}/checkout/coupon?coupon=${value.coupon}`);
            setAppliedCoupon(response.data.coupon);
            setPrice((currentPrice - (currentPrice*response.data.discount/100)));
        } catch (error) {
            console.log(error);
            if ( axios.isAxiosError(error) ){
                toast.error(`${error.response?.data}`);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const onShare = async()=>{
        await navigator.share({
            title,
            url : `${window.location.href}`
        })
    }


    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-y-6">
                <div className="space-y-1 text-xs">
                    <h3 className="text-center">30-Day Money-Back Guarantee</h3>
                    <h2 className="text-center">Full Lifetime Access</h2>
                </div>
                {
                    appliedCoupon && (
                        <div className="w-full py-2 px-3 border-2 border-zinc-400 border-dashed">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <pre className="font-semibold text-zinc-600">
                                        {appliedCoupon}
                                    </pre>
                                    <span className="text-xs text-zinc-500">
                                        is applied
                                    </span>
                                </div>
                                <Button
                                    className="h-8 w-8"
                                    variant="ghost"
                                    size="icon"
                                    onClick={()=>{
                                        setPrice(currentPrice);
                                        setAppliedCoupon(undefined);
                                        form.reset();
                                    }}
                                >
                                    <X className="text-zinc-600" />
                                </Button>
                            </div>
                        </div>
                    )
                }
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-center w-full">
                            <FormField
                                control={form.control}
                                name="coupon"
                                render={({field})=>(
                                    <FormItem className="w-full flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="h-10 w-full border-2 border-r-0 border-zinc-400 rounded-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                                disabled = { isLoading || !!appliedCoupon }
                                                placeholder="Enter Coupon"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="h-10 bg-neutral-800 hover:bg-neutral-800/80 font-semibold rounded-none"
                                disabled = { isLoading || !!appliedCoupon || !isValid }
                            >
                                Apply
                            </Button>
                        </div>
                    </form>
                </Form>
                <CourseEnrollButton
                    courseId={courseId}
                    price={price}
                    disabled={isLoading}
                    coupon={appliedCoupon}
                />
            </div>
            <div 
                className="text-sm font-semibold cursor-default md:cursor-pointer"
                onClick={onShare}
            >
                Share
            </div>
        </div>
    )
}
