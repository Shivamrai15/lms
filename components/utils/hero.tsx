import Image from "next/image"

export const Hero = () => {
    return (
        <div className='w-full aspect-video md:aspect-[3/1]'>
            <section className="max-w-5xl w-full py-10 mx-auto">
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="w-full flex flex-col justify-center gap-y-8">
                        <h2 className="text-6xl font-extrabold text-zinc-800">LearnCraft</h2>
                        <h4 className="text-2xl font-semibold text-zinc-600">An E-Learning Platform To Empower Your Skills with Interactive Learning and Certifications</h4>    
                    </div>
                    <div className="w-full aspect-square relative flex items-center justify-center">
                        <Image
                            src="/assets/13923473_04_13_21_05.svg"
                            alt="Image"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
