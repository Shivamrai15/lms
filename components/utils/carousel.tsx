import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { Course } from '@prisma/client';
import { Card } from '@/components/courses/ui/card';
import { useSWRQuery } from '@/hooks/useSWRQuery';


interface CourseCarouselProps {
    href : string,
    bestseller? : boolean
}

export const CourseCarousel = ({
    href,
    bestseller
} : CourseCarouselProps) => {
    const {data, isLoading } : { data : (Course& { _count: {
        purchases: number;
    }})[], isLoading : boolean } = useSWRQuery(href); 
    
    if ( !isLoading && data.length === 0 ) {
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
                                
                            </CarouselItem>
                        </>
                        ) : data.map((course) => (
                            <CarouselItem key={course.id} className="basis-auto cursor-pointer" >
                                <Card course={course} isBestSeller = {bestseller} />
                            </CarouselItem>
                    )) }
                </CarouselContent>
            </Carousel>
        </div>
    )
}
