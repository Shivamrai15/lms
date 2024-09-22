import { Metadata } from "next";
import { Header } from "@/components/utils/header"

export const metedata: Metadata = {
    title : "Profile"
}

interface LayoutPageProps {
    children: React.ReactNode;
}


const LayoutPage = ({
    children
}: LayoutPageProps ) => {
    return (
        <main className="h-full overflow-y-auto">
            <Header variant="default" />
            <section>
                {children}
            </section>
        </main>
    );
}

export default LayoutPage;