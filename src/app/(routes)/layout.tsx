import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "@/styles/globals.css";
import { ReactQueryProvider, ThemeProvider } from "@/client-providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best in Role - LOL - Worlds 2023 Pro Players Leader Board",
  description:
    "Discover the top Pro Players in each role —Top, Jungle, Mid, AD Carry, and Support— and vote for your favourites now! | League of Legends Worlds 2023.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <html lang="en">
          <body
            className={cn(
              "scrollbar scrollbar-track-background scrollbar-thumb-foreground/20 scrollbar-corner-background scrollbar-thumb-rounded-full scrollbar-w-1.5 scrollbar-h-1.5 hover:scrollbar-track-accent hover:scrollbar-thumb-accent-foreground",
              inter.className,
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen   flex-col  items-center bg-background">
                {/* <MainNavBar /> */} {children}
              </div>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
