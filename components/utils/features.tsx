import { Abril_Fatface } from "next/font/google";
import Image from "next/image";

const font =  Abril_Fatface({
    subsets : ["latin"],
    weight : ["400"]
})

export const Features = () => {
    return (
        <div className="mt-20 md:pb-20">
            <div className={font.className}>
                <h1 className="text-2xl md:text-4xl">Goals are the compass, learning is the journey.</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-10 gap-6">
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/ai.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Lorem, ipsum dolor.</h3>
                            <p className="text-sm text-zinc-800">Lorem ipsum dolor, Lorem ipsum dolor sit amet,  adipisicing elit. Dolorum, deserunt?</p>
                        </div>
                    </div>
                </div>
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/notes.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Lorem, ipsum dolor.</h3>
                            <p className="text-sm text-zinc-800">Lorem ipsum dolor, Lorem ipsum dolor sit amet, consectetur adipisicing. sit amet consectetur adipisicing elit. Dolorum, deserunt?</p>
                        </div>
                    </div>
                </div>
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/exam.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Lorem, ipsum dolor.</h3>
                            <p className="text-sm text-zinc-800">Lorem ipsum dolor, Lorem ipsum dolor sit amet, consectetur adipisicing. sit amet consectetur adipisicing elit. Dolorum, deserunt?</p>
                        </div>
                    </div>
                </div>
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/certificate.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Lorem, ipsum dolor.</h3>
                            <p className="text-sm text-zinc-800">Lorem ipsum dolor, Lorem ipsum dolor sit amet, consectetur adipisicing. sit amet consectetur adipisicing elit. Dolorum, deserunt?</p>
                        </div>
                    </div>
                </div>
                <div className="py-4 h-full md:py-10 px-6 rounded-lg md:rounded-xl border-2 border-zinc-300 border-l-4 shadow-md cursor-default">
                    <div className="flex items-center gap-x-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                                src="./assets/graph.png"
                                alt="Icon"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-800 font-semibold text-lg">Lorem, ipsum dolor.</h3>
                            <p className="text-sm text-zinc-800">Lorem ipsum dolor, Lorem ipsum dolor sit amet, consectetur adipisicing. sit amet consectetur adipisicing elit. Dolorum, deserunt?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
