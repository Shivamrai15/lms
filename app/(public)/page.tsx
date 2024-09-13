import { BestSeller } from "@/components/utils/best-seller"
import { Company } from "@/components/utils/company"
import { Hero } from "@/components/utils/hero"
import { NewCourses } from "@/components/utils/new-courses"



const HomePage = () => {
    return (
        <main className="space-y-16 md:space-y-0 pb-20">
            <Hero/>
            <BestSeller/>
            <NewCourses/>
            <Company/>
        </main>
    )
}

export default HomePage;