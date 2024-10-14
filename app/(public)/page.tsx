import { Abril_Fatface } from "next/font/google";

import { Header } from "@/components/utils/header";
import { HomeFloatingIcons } from "@/components/utils/home-floating-icons";
import { SearchForm } from "@/components/courses/forms/search.form";
import { FeatureSubPage } from "@/components/subpages/feature.subpage";
import { CoursesSubPage } from "@/components/subpages/courses.subpage";


const font =  Abril_Fatface({
    subsets : ["latin"],
    weight : ["400"]
})


const HomePage = () => {

    return (
        <>
            <section className="min-h-full h-full sticky top-0 bg-[url('/assets/hero.avif')] bg-cover bg-no-repeat">
                <div className="h-full backdrop-brightness-75 relative">
                    <Header
                        variant="ghost"
                    />
                    <div className="w-full h-[calc(100%-5rem)] flex flex-col justify-end" >
                        <div className="max-w-5xl mx-auto w-full">
                            <div className={`${font.className} px-6 md:w-1/2 py-10 space-y-6`}>
                                <h1 className="text-3xl md:text-8xl text-white drop-shadow-2xl shadow-black">
                                    LearnIT
                                </h1>
                                <p className="text-lg md:text-xl  text-zinc-200">
                                    An E-Learning Platform To Empower Your Skills with Interactive Learning and Certifications
                                </p>
                            </div>
                        </div>
                        <SearchForm/>
                    </div>
                    <div className="hidden md:block h-full w-1/2 absolute right-0 top-0 -z-10 overflow-y-hidden">
                        <HomeFloatingIcons/>
                    </div>
                </div>
            </section>
            <FeatureSubPage/>
            <CoursesSubPage/>
        </>
    )
}

export default HomePage;