"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CertificateCardProps {
    certificateId : string;
    image : string;
    title : string
}

export const CertificateCard = ({
    certificateId,
    image,
    title
} : CertificateCardProps ) => {

    const router = useRouter();

    return (
        <div 
            className='w-full p-2 bg-zinc-100 rounded-md shadow-md space-y-4 hover:scale-105 transition-all border border-zinc-200 duration-300'
            onClick={()=>router.push(`/certificate/${certificateId}`)}
        >
            <div className="aspect-video w-full rounded-md overflow-hidden relative">
                <Image
                    src={image}
                    alt="Image"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="space-y-2 px-2 pb-2">
                <h2 className="text-zinc-700 font-medium text-sm">{title}</h2>
            </div>
        </div>
    )
}
