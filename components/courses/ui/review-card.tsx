import { formatDistance } from "date-fns";
import { Stars } from "@/components/rating/stars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Rate } from "@prisma/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Calendar } from "lucide-react";

interface ReviewCardProps {
    review : Rate & { user: {
        image: string | null;
        name: string | null;
    }}
}

export const ReviewCard = ({
    review
}: ReviewCardProps ) => {
    return (
        <div className="w-full relative z-10">
            <div className="absolute inset-px bg-gradient-to-b from-white to-neutral-100 rounded-md shadow-sm" />
            <div className="relative z-10 w-full p-6 rounded-md space-y-4">
                <div className="flex items-center gap-x-6">
                    <Avatar className="bg-neutral-700">
                        <AvatarImage src={review.user.image??""} />
                        <AvatarFallback className="bg-neutral-700 text-white" >{review.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="w-full flex items-end flex-wrap justify-between">
                        <div className="flex flex-col gap-y-1">
                            <h2 className="text-zinc-800 text-[15px] font-medium" >{review.user.name}</h2>
                            <Stars avgRating={`${review.star}`} />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Calendar className="size-4 text-zinc-700"/>
                            <span className="text-[13px] text-zinc-600">{formatDistance(review.updatedAt, new Date(), { addSuffix: true })}</span>
                        </div>
                    </div>
                </div>
                <p className="text-zinc-700 text-[15px] font-medium" >{review.comment}</p>
            </div>
        </div>
    )
}
