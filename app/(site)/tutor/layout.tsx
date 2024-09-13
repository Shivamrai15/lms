import { Sidebar } from "@/components/utils/sidebar";


interface TutorLayoutProps {
    children : React.ReactNode;
}
const TutorLayout = ({
    children
} : TutorLayoutProps ) => {
    return (
        <div className="h-full flex w-full">
            <div className="hidden h-full bg-neutral-800 md:flex w-56 lg:w-60 flex-col inset-y-0 shrink-0">
                <Sidebar/>
            </div>
            <main className="min-h-full h-full overflow-y-auto w-full md:w-[clac(100%-14rem)] lg:w-[clac(100%-15rem)]">
                { children }
            </main>
        </div>
    )
}

export default TutorLayout;