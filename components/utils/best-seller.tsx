"use client";

import { CourseCarousel } from "./carousel";
import { Heading } from "./heading";

export const BestSeller = () => {
    return (
        <div className='px-4 md:px-10 lg:px-16 space-y-6'>
            <div className='space-y-2'>
                <Heading className='text-xl md:text-3xl lg:text-5xl font-[600] text-zinc-700' >Accelerate growth — for you or your organization</Heading>
                <p className='text-zinc-600 font-medium' >Bestseller of the site</p>
            </div>
            <CourseCarousel href="/api/public/bestseller" bestseller= {true} />
        </div>
    )
}
