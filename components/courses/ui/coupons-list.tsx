"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coupon } from "@prisma/client";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CouponListProps {
    coupons : Coupon[];
}

export const CouponList = ({
    coupons,
}: CouponListProps) => {


    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async( couponId: string, courseId: string )=>{
        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}/coupon/${couponId}`);
            toast.success("Coupon has been deleted successfully");
            router.refresh();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }
    
    
    return (
        <div className="flex flex-col w-full gap-y-2">
            {
                coupons.map((coupon)=>(
                    <div 
                        className="w-full p-4 bg-slate-200 border rounded-md"
                        key={coupon.id}
                    >
                        <div className="text-zinc-800 font-medium line-clamp-1">
                            {coupon.coupon}
                        </div>
                        <div className="grid items-center grid-cols-5">
                            <p className="col-span-3 w-full text-zinc-600 text-sm font-medium">
                                {format(coupon.expires, "PPP")}
                            </p>
                            <div className="flex items-center justify-center">
                                <Badge>
                                    {coupon.discount} %
                                </Badge>
                            </div>
                            <div className="flex items-center justify-end">
                                <Button
                                    className="h-8 w-8"
                                    variant="destructive"
                                    size="icon"
                                    disabled={isLoading}
                                    onClick={()=>onDelete(coupon.id, coupon.courseId)}
                                >
                                    <Trash className="h-5 w-5"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
