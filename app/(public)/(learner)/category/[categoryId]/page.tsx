import Image from "next/image";
import { Metadata } from "next";

import { Card } from "@/components/courses/ui/card";
import { getCoursesByCategoryId } from "@/server/course";
import { categoryMetaData } from "@/server/metadata";

interface CategoryPageProps {
    params : { categoryId : string }
}


export async function generateMetadata(
    { params } : CategoryPageProps,
) : Promise<Metadata> {

    const data = await categoryMetaData(params.categoryId);
    
    if ( !data ) {
        return {};
    }

    return {
        title: data.name,
    }
}


const CategoryPage = async({
    params
} : CategoryPageProps ) => {
    
    const courses = await getCoursesByCategoryId(params.categoryId);
    
    return (
        <main className="w-full my-10 px-6">
            <div className="max-w-5xl w-full mx-auto">
                { courses && <h1 className="text-2xl font-bold text-zinc-700" >{courses.category.name} {">"} {courses.name}</h1>}
                { (!courses || courses.courses.length === 0) && (
                    <div className="mt-20 space-y-6">
                        <div className="w-40 aspect-square mx-auto relative">
                            <Image
                                src="/assets/bag.png"
                                fill
                                alt=""
                                className="object-contain"
                            />
                        </div>
                        <p className="text-sm text-zinc-600 font-medium text-center">
                            Courses in this category is empty. Keep shopping to find a course!
                        </p>
                    </div>
                ) }
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {
                        courses?.courses.map((item)=>(
                            <Card
                                course={item}
                                key={item.id}
                                className="w-full md:w-full md:hover:scale-105 transition-all duration-300"
                            />
                        ))
                    }
                </section>
            </div>
        </main>
    )
}

export default CategoryPage;