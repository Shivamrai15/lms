"use client";

import { CourseCarousel } from "./carousel";

export const BestSeller = () => {
    return (
        <div className='px-4 md:px-10 lg:px-16 space-y-6'>
            <div className='space-y-2'>
                <h1 className='text-xl md:text-3xl lg:text-4xl font-bold text-zinc-700' >Accelerate growth — for you or your organization</h1>
                <p className='text-zinc-600 font-medium' >Bestseller of the site</p>
            </div>
            <CourseCarousel href="/api/public/bestseller" bestseller= {true} />
        </div>
    )
}
