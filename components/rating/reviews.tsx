"use client"

import { format } from "date-fns";
import { Rate } from "@prisma/client";
import { useSWRQuery } from "@/hooks/useSWRQuery";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa6";
import { 
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";


interface Response {
    data : (Rate & { user : { id: string, name: string|null, image: string|null } })[];
    error : any;
    isLoading :  boolean;
}


interface ReviewsProps {
    courseId: string;
}

export const Reviews = ({
    courseId
} : ReviewsProps ) => {
    
    const { data, error, isLoading }: Response = useSWRQuery(`/api/courses/${courseId}/review`)

    if (isLoading || error || data.length==0) {
        return null;
    }

    const stars = [1, 2, 3, 4, 5];

    return (
        <div
            className="mt-10 space-y-6 w-full"
        >
            <h1 className="font-semibold text-zinc-800 md:text-lg">Reviews</h1>          
            {
                data.map((review)=>(
                    <div key={review.id} className="w-full">
                        <div className="flex items-start w-full gap-x-6 mb-2">
                            <div className="h-10 md:h-14 aspect-square shrink-0">
                                <Avatar className="h-full w-full">
                                    <AvatarImage src={review.user?.image||""} />
                                    <AvatarFallback className="bg-neutral-800 text-zinc-200 font-semibold md:text-lg" >{review.user.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h2 className="text-lg text-zinc-800 font-semibold" >{review.user?.name}</h2>
                                    <div className="flex items-center flex-wrap gap-x-6">
                                        <div className="flex gap-x-2 items-center">
                                            { stars.map((value, index)=>(
                                                value <= (review?.star || 0) ? (
                                                    <FaStar
                                                        key={index}
                                                        className="h-4 w-4 text-zinc-600"
                                                    />
                                                ) : (
                                                    <Star
                                                        key={index}
                                                        className="h-4 w-4 text-zinc-600"
                                                    />
                                                )
                                            )) }
                                        </div>
                                        <p className="text-zinc-700 text-sm font-semibold">
                                            { format(review.createdAt, "dd LLL yyyy")}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-700">
                                    {review?.comment}
                                </p>
                            </div>
                        </div>
                        <Separator/>
                    </div>
                ))
            }
        </div>
    )
}
