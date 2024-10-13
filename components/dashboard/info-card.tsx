import Image from "next/image";

interface InfoCardProps {
    numberOfItems : number;
    label : string;
    src : string;
}

export const InfoCard = ({
    numberOfItems,
    label,
    src
}: InfoCardProps ) => {
    return (
        <div className="border rounded-md flex items-center gap-x-6 p-3 border-zinc-300 border-l-4 shadow-sm">
            <div className="h-14 w-14 md:h-16 md:w-16 shrink-0 relative">
                <Image
                    src={src}
                    fill
                    alt=""
                    className="object-contain"
                />
            </div>
            <div className="flex flex-col text-sm">
                <h1 className="text-lg font-semibold text-zinc-700">{label}</h1>
                <span className="text-zinc-600 font-medium" >{numberOfItems} {numberOfItems===1?"Course" :"Courses"}</span>
            </div>
        </div>
    )
}
