import { SiFord } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import { RiNetflixFill } from "react-icons/ri";
import { FaSpotify } from "react-icons/fa";
import { SiAdobe } from "react-icons/si";

export const Company = () => {
    return (
        <section className='w-full bg-neutral-800 py-10 px-6'>
            <div className="max-w-5xl w-full mx-auto space-y-6">
                <h1 className="text-zinc-100 font-medium text-center">Trusted by over multiple companies and learners around the world</h1>
                <div className="flex items-center justify-center gap-4 gap-x-8 md:gap-x-14">
                    <SiFord className="h-32 w-32  text-zinc-500" />
                    <TbBrandDisney className="h-16 w-16 text-zinc-500" />
                    <RiNetflixFill className="h-14 w-14 text-zinc-500" />
                    <FaSpotify className="h-14 w-14 text-zinc-500" />
                    <SiAdobe className="h-14 w-14 text-zinc-500" />
                </div>
            </div>
        </section>
    )
}
