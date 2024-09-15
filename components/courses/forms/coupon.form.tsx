"use client";


import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Coupon } from "@prisma/client";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { CouponSchema } from "@/schemas/coupon.schema";
import { cn } from "@/lib/utils";
import { CouponList } from "../ui/coupons-list";



interface CouponFormProps {
    initialData : {
        coupons : Coupon[]
    }
    courseId : string;
}

export const CouponForm = ({
    initialData,
    courseId
}: CouponFormProps) => {

    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const toggleCreate = ()=>setIsCreating((prev)=>!prev);

    const form = useForm<z.infer<typeof CouponSchema>>({
        resolver : zodResolver(CouponSchema),
        defaultValues : {
            coupon : "",
        }
    });

    const { isSubmitting } = form.formState;


    const onSubmit = async(values : z.infer<typeof CouponSchema>) => {
        try {
            
            setIsCreating(true);
            await axios.post(`/api/courses/${courseId}/coupon`, values);
            toast.success("Coupon added to the course");
            router.refresh();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsCreating(false);
        }
    }



    return (
        <div className="mt-6 border bg-zinc-100 p-4 transition-transform">
            <div className="flex items-center justify-between font-medium text-zinc-800">
                <span className="font-semibold">Course Coupons</span>
                <Button
                    variant="ghost"
                    onClick={toggleCreate}
                >
                    {
                        isCreating ? (
                            <>Cancel</>
                        ) : (
                            <>
                               <PlusCircle className="h-4 w-4 mr-3" />
                               Add a coupon 
                            </>
                        )
                    }
                </Button>
            </div>
            {
                isCreating ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 mt-4"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="coupon"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder={`E.g. AX783SGA3`}
                                                    className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                                    {...field}
                                                    disabled = {isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="discount"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder={`E.g. 10`}
                                                    className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                                    value={field.value}
                                                    onChange={(e)=>field.onChange(Number.parseInt(e.target.value))}
                                                    disabled = {isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="expires"
                                    render={({field})=>(
                                        <FormItem>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full h-14 pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Coupon expires on</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        onSelect={(date)=>field.onChange(`${date}`)}
                                                        disabled={(date) =>
                                                            date < new Date()
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="rounded-none h-14 font-semibold"
                                    type="button"
                                    onClick={toggleCreate}
                                    disabled = {isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="rounded-none h-14 font-semibold"
                                    type="submit"
                                    disabled = {isSubmitting}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <>
                        <div className={cn(
                            "text-sm mt-2 font-medium",
                            !initialData.coupons.length && "text-zinc-600 italic"
                        )}>
                            {
                                !initialData.coupons.length && "No Coupons"
                            }
                            <CouponList
                                coupons={initialData.coupons}
                            />
                        </div>
                    </>
                )
            }
        </div>
    )
}
