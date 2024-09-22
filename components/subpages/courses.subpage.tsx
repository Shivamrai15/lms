"use client";

import { Abril_Fatface } from "next/font/google";
import { BestSeller } from "@/components/utils/best-seller";

const font =  Abril_Fatface({
    subsets : ["latin"],
    weight : ["400"]
});


export const CoursesSubPage = () => {
    return (
        <section className="min-h-full bg-neutral-800 sticky top-0 rounded-t-3xl md:rounded-t-[5rem] py-20">
            <BestSeller/>
        </section>
    )
}
