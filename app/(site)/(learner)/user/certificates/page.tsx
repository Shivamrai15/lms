import Image from "next/image";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth"
import { getUserCertificates } from "@/server/certificate";
import { CertificateCard } from "@/components/utils/certificate-card";

export const metadata : Metadata = {
    title : "Your certificates"
}

const CertificatesPage = async() => {
    
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return redirect("/");
    }

    const certificates = await getUserCertificates(session.user.id);

    return (
        <main className="w-full my-10 px-6">
            <div className="max-w-5xl w-full mx-auto">
                <h1 className="text-3xl font-bold text-zinc-700" >Your Certificates</h1>
                { certificates.length === 0 && (
                    <div className="mt-20 space-y-6">
                        <div className="w-60 aspect-square mx-auto relative">
                            <Image
                                src="/assets/empty.jpg"
                                fill
                                alt=""
                                className="object-contain"
                            />
                        </div>
                        <p className="text-sm text-zinc-600 font-medium text-center">
                        Your certificate wallet is empty. 📚 Start exploring our courses and earn your first certificate today!
                        </p>
                    </div>
                ) }
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {
                        certificates.map((certificate)=>(
                            <CertificateCard
                                key={certificate.id}
                                certificateId={certificate.id}
                                image={certificate.course.image!}
                                title={certificate.course.title}
                            />
                        ))
                    }
                </section>
            </div>
        </main>
    )
}

export default CertificatesPage