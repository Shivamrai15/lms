import { Header } from "@/components/utils/header";


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