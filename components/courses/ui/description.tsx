import { Preview } from "@/components/utils/preview";

interface DescriptionProps {
    description : string;
}

export const Description = ({
    description
} : DescriptionProps ) => {
    return (
        <section className="mt-20 w-full px-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-xl md:text-2xl font-bold text-zinc-700">
                    Course Description
                </h1>
                <div className="text-zinc-600">
                    <Preview value={description} />
                </div>
            </div>
        </section>
    )
}
