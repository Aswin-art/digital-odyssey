import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Odyssey - Chapter One",
  description: "Digital Odyssey: The Canonical Chronicles",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} overflow-hidden`}>
          <NextTopLoader />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
