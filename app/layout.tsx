import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { NavigateProvider } from "@/providers/navigate.provider";
import { EdgeStoreProvider } from "@/providers/edgestore.provider";

const poppins = Poppins({
    subsets: ["latin"],
    weight : ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
    title: "LMS",
    description: "",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth();

    return (
        <html lang="en">
            <body className={poppins.className}>
                <SessionProvider
                    session={session}
                >
                    <EdgeStoreProvider>
                        <Toaster
                            position="top-center"
                            richColors={true}
                        />
                        <NavigateProvider
                            session = { session }
                        />
                        {children}
                    </EdgeStoreProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
