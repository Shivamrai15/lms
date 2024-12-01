import Image from "next/image";
import { searchCourses } from "@/server/course";
import { CardWithRating } from "@/components/courses/ui/card-with-ratings";


interface SearchPageProps {
    searchParams : {
        query : string
    }
}

const SearchPage = async({
    searchParams
} : SearchPageProps ) => {

    if (!searchParams.query){
        return (
            <div>
            </div>
        )
    }

    const courses = await searchCourses(searchParams.query);

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="relative h-60 aspect-square">
                    <Image
                        src="/assets/empty.jpg"
                        fill
                        alt=""
                        className="object-contain"
                    />
                </div>
                <div>
                    <p className="text-zinc-800 mb-3 text-center font-semibold">No courses found for {searchParams.query}.</p>
                    <p className="text-zinc-600 text-sm text-center">
                        Try searching with different keywords or explore popular categories.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <h1 className="text-zinc-700 font-medium" >Showing {courses.length} results</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {
                    courses.map((course)=>(
                        <CardWithRating
                            key={course.id}
                            course={course}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default SearchPage