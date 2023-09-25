import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/globals.css";
import MainNavBar from "@/components/main-nav-bar";
import { ReactQueryProvider, ThemeProvider } from "@/client-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best In Role",
  description: "Vote for your best in role League of legends pro-players !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="bg-background flex min-h-screen flex-col  ">
                <MainNavBar /> {children}
              </div>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
