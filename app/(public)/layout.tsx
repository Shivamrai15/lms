import { Header } from "@/components/utils/header";

interface PublicLayoutProps {
    children : React.ReactNode;
}

const PublicLayout = ({
    children
} : PublicLayoutProps ) => {
    return (
        <div className="h-full overflow-y-auto">
            <div className="h-full overflow-y-auto">
                <Header/>
                {children}
            </div>
        </div>
    )
}

export default PublicLayout;
