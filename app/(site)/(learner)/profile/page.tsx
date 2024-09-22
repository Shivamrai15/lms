
import Image from "next/image";
import { redirect } from "next/navigation";
import { Abril_Fatface } from "next/font/google";

import { auth } from "@/auth"
import { RoleForm } from "@/components/profile/form/role.form";


const font =  Abril_Fatface({
    subsets : ["latin"],
    weight : ["400"]
});


const ProfilePage = async() => {
    
    const session = await auth();
    if (!session || !session.user.id) {
        return redirect("/")
    }

    if (!session.user.profile) {
        return (
            <div className="flex flex-col items-center justify-center">
                <RoleForm/>
            </div>
        )
    }
    
    return (
        <div className="">
            <div className="bg-neutral-800 p-6 md:py-10">
                <div className="max-w-5xl w-full mx-auto flex items-center gap-x-6 md:gap-x-12">
                    <div className="h-20 md:h-28 aspect-square relative rounded-full overflow-hidden">
                        <Image
                            src={session.user?.image || ""}
                            alt="Image"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h2 className={`${font.className} text-2xl md:text-4xl text-zinc-100`}>
                        {session.user.name}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage