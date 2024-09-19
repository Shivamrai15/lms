import { TutorHeader } from "@/components/account/tutor-header";
import { UserAvatar } from "@/components/account/user-avatar";
import { Navigation } from "@/components/utils/navigation";
import { Sidebar } from "@/components/utils/sidebar";


interface TutorLayoutProps {
    children : React.ReactNode;
}
const TutorLayout = ({
    children
} : TutorLayoutProps ) => {
    return (
        <div className="h-full flex w-full">
            <aside className="hidden h-full bg-neutral-800 md:flex w-56 lg:w-60 flex-col inset-y-0 shrink-0">
                <Sidebar/>
            </aside>
            <div className="h-full w-full md:w-[clac(100%-14rem)] lg:w-[clac(100%-15rem)]">
                <header
                    className="h-16 flex items-center border-b z-10 w-full shadow-md "
                >
                    <div className="px-6 md:px-10 flex items-center justify-between w-full">
                        <div className="md:hidden">
                            <TutorHeader/>
                        </div>
                        <div className="hidden md:block">
                            <Navigation/>
                        </div>
                        <UserAvatar/>
                    </div>
                </header>
                <main className="h-[calc(100%-4rem)] overflow-y-auto w-full">
                    { children }
                </main>
            </div>
        </div>
    )
}

export default TutorLayout;