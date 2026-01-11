import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/SessionProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Pluma Imóveis - Encontre seu imóvel dos sonhos",
    description: "Plataforma premium de imóveis com mapa interativo e sistema CMS completo",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body
                className={`${plusJakartaSans.variable} ${inter.variable} antialiased`}
            >
                <SessionProvider session={session}>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
