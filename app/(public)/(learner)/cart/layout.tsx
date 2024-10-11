import { Metadata } from "next";
import { Header } from "@/components/utils/header";

export const metadata: Metadata = {
    title : "Cart"
}

interface LayoutPageProps {
    children : React.ReactNode;
}

const LayoutPage = ({
    children
} : LayoutPageProps ) => {
    return (
        <div>
            <Header variant="default" />
            {children}
        </div>
    )
}

export default LayoutPage;