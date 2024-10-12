import { auth } from "@/auth";
import { redirect } from "next/navigation";


const SocialPage = async() => {
    
    const session = await auth();
    if (!session || !session.user.id) {
        return redirect("/");
    }


    
    return (
        <div>
            
        </div>
    )
}

export default SocialPage