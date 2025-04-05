
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "MatchSavoir | Mise en relation formateurs et apprenants",
  description: "Plateforme de mise en relation entre formateurs et apprenants pour un apprentissage personnalisé et efficace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
