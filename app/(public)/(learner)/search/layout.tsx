import SearchPageForm from "@/components/courses/forms/search-page.form";
import { Header } from "@/components/utils/header";


interface LayoutPageProps {
    children : React.ReactNode;
}

const LayoutPage = ({
    children
} : LayoutPageProps ) => {
    return (
        <div className="h-full overflow-y-auto">
            <Header variant="default" />
            <section className="mt-10 max-w-5xl w-full mx-auto px-6">
                <SearchPageForm/>
                <div className="py-10 w-full">
                    {children}
                </div>  
            </section>
        </div>
    )
}

export default LayoutPage;