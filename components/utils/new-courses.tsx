"use client";

import { CourseCarousel } from "./carousel";

export const NewCourses = () => {
    return (
        <div className='px-4 md:px-10 lg:px-16 space-y-6'>
            <div className='space-y-2'>
                <h1 className='text-xl md:text-3xl lg:text-4xl font-bold text-zinc-800' >Unlock Your Potential with Our Newest Offering</h1>
                <p className='text-zinc-600 font-medium' >New Courses</p>
            </div>
            <CourseCarousel href="/api/public/courses/new" bestseller= {false} />
        </div>
    )
}
