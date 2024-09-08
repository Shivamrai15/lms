import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { Header } from "@/components/utils/header";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

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
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster
                            position="top-center"
                            richColors={true}
                        />
                        <div className="h-full overflow-y-auto">
                            <Header/>
                            {children}
                        </div>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
