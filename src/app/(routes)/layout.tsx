import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/globals.css";
import { ReactQueryProvider, ThemeProvider } from "@/client-providers";
import { cn } from "@/lib/utils";

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
          <body
            className={cn(
              "scrollbar scrollbar-thumb-foreground/60 scrollbar-track-background scrollbar-corner-background scrollbar-thumb-rounded-full scrollbar-w-0.5 scrollbar-h-0.5 hover:scrollbar-thumb-accent-foreground hover:scrollbar-track-accent",
              inter.className,
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="  flex min-h-screen   flex-col  items-center bg-background">
                {/* <MainNavBar /> */} {children}
              </div>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
