import Image from "next/image";
import { Header } from "@/components/utils/header";

interface AuthLayoutProps {
    children : React.ReactNode;
}

const AuthLayout = ({
    children
} : AuthLayoutProps ) => {
    return (
        <main className="h-full overflow-y-auto">
            <Header variant="default" />
            <section className="min-h-[calc(100%-5rem)] mx-auto max-w-5xl w-full py-10">
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="w-full aspect-square relative flex items-center justify-center">
                        <Image
                            src="/assets/12332965.svg"
                            alt="Image"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AuthLayout