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
              /*TODO: instead of pl-2, switch to scrollbar-gutter: stable both-edges; (not supported yet?) */
              "pl-2 scrollbar scrollbar-track-background scrollbar-thumb-scrollbars scrollbar-corner-background scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-h-2 hover:scrollbar-track-scrollbars-accent hover:scrollbar-thumb-scrollbars-accent-foreground",
              inter.className,
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen min-w-max justify-center  bg-background">
                {children}
              </div>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
