import { Metadata } from 'next';
import React from 'react';
import '../globals.css' 

export const metadata: Metadata = {
  title: "Authentication | Match Savoir",
  description: "Plateforme de mise en relation entre formateurs et apprenants pour un apprentissage personnalisé et efficace.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <main>
          <div className="min-h-screen bg-[#1a1e2e] flex items-center justify-center">{children}</div>
        </main>
      </body>
    </html>
  );
}
