import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { CardSkeleton } from '../courses/ui/card-skeleton';
import { Course } from '@/types';
import { CardWithRating } from '../courses/ui/card-with-ratings';


interface CourseCarouselProps {
    href : string,
    bestseller? : boolean
}

interface ResponseData {
    data : Course[];
    isLoading : boolean;
}

export const CourseCarousel = ({
    href,
    bestseller
} : CourseCarouselProps) => {
    const {data, isLoading }: ResponseData = useSWRQuery(href); 
    
    if ( !isLoading && data?.length === 0 ) {
        return null;
    }

    return (
        <div className="space-y-6 md:space-y-10 w-full">
            <Carousel
                className="w-full space-y-3"
                opts = {{
                    align : "start",
                    slidesToScroll : "auto"
                }}
            >
                <div className="h-6 hidden md:block">
                    <CarouselPrevious className="top-0 left-0"/>
                    <CarouselNext className="top-0 left-14"/>
                </div>
                <CarouselContent className="space-x-2">
                    { isLoading ? (
                        <>
                            <CarouselItem className="basis-auto" >
                                <CardSkeleton isBestSeller={bestseller} />
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <CardSkeleton isBestSeller={bestseller} />
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <CardSkeleton isBestSeller={bestseller} />
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <CardSkeleton isBestSeller={bestseller} />
                            </CarouselItem>
                        </>
                        ) : data.map((course) => (
                            <CarouselItem key={course.id} className="basis-auto cursor-pointer py-8" >
                                <CardWithRating course={course} isBestSeller={bestseller} />
                            </CarouselItem>
                    )) }
                </CarouselContent>
            </Carousel>
        </div>
    )
}
