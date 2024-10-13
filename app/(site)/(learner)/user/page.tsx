
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Abril_Fatface } from "next/font/google";

import { auth } from "@/auth"
import { RoleForm } from "@/components/profile/form/role.form";
import { getUserCourses } from "@/server/course";
import { UserCourses } from "@/components/courses/ui/user-courses";


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

    const courses = await getUserCourses(session.user.id);
    
    return (
        <div className="">
            <section className="bg-neutral-800 p-6 md:py-10">
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
            </section>
            <section className="pt-16 px-6" id="courses" >
                <div className="max-w-5xl w-full mx-auto">
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-800">Overview</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                        <Link 
                            className="w-full flex flex-col justify-between aspect-square border p-6 border-zinc-300 rounded-md hover:-translate-y-2 hover:shadow-md duration-300 transition-all"
                            href="/user/edit-profile"
                        >
                            <div className="w-2/3 aspect-square mx-auto relative ">
                                <Image
                                    src="/assets/profile.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="font-medium text-zinc-700 text-center text-sm">Edit Profile</h3>
                        </Link>
                        <Link 
                            className="w-full flex flex-col justify-between aspect-square border p-6 border-zinc-300 rounded-md hover:-translate-y-2 hover:shadow-md duration-300 transition-all"
                            href="/cart"
                        >
                            <div className="w-2/3 aspect-square mx-auto relative ">
                                <Image
                                    src="/assets/cart.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="font-medium text-zinc-700 text-center text-sm">Cart</h3>
                        </Link>
                        <Link 
                            className="w-full flex flex-col justify-between aspect-square border p-6 border-zinc-300 rounded-md hover:-translate-y-2 hover:shadow-md duration-300 transition-all"
                            href="/user/certificates"
                        >
                            <div className="w-2/3 aspect-square mx-auto relative ">
                                <Image
                                    src="/assets/color-certificate.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="font-medium text-zinc-700 text-center text-sm">My Certificates</h3>
                        </Link>
                        <Link 
                            className="w-full flex flex-col justify-between aspect-square border p-6 border-zinc-300 rounded-md hover:-translate-y-2 hover:shadow-md duration-300 transition-all"
                            href="/user/my-learning"
                        >
                            <div className="w-2/3 aspect-square mx-auto relative ">
                                <Image
                                    src="/assets/analyse.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="font-medium text-zinc-700 text-center text-sm">My Learning</h3>
                        </Link>
                    </div>
                </div>
            </section>
            <UserCourses />
        </div>
    )
}

export default ProfilePage