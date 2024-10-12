import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getUserProfile } from "@/server/account"
import { ProfileForm } from "@/components/account/form/profile-form";

const EditProfilePage = async() => {
    
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return redirect("/");
    }

    const profile = await getUserProfile(session.user.id);

    if (!profile) {
        return redirect("/");
    }
    
    return (
        <div className="w-full h-full">
            <div className="h-20 w-full bg-neutral-200 flex items-center px-6 md:px-10 font-bold text-zinc-800">
                Public Profile
            </div>
            <div className="p-6 py-10 md:px-10 ">
                <ProfileForm
                    name={profile.name!}
                    description={profile.profile?.description||undefined}
                    gender={profile.profile?.gender||undefined}
                    headline={profile.profile?.headline||undefined}
                />
            </div>
        </div>
    )
}

export default EditProfilePage;