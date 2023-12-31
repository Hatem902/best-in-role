import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { ReactQueryProvider, ThemeProvider } from "@/client-providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best in Role - LOL - Worlds 2023 Pro Players Leader Board",
  description:
    "Discover the top Pro Players in each role —Top, Jungle, Mid, AD Carry, and Support— and vote for your favourites now! | League of Legends Worlds 2023.",
  verification: {
    google: "LxjrDqkahaYcgRy3Cjq1oxJIOiaK5j5Ix_cb-9hQ0uI",
  },
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
              /*TODO: instead of pl-1.5, switch to scrollbar-gutter: stable both-edges; (not supported yet?) */
              "pl-0 scrollbar scrollbar-track-background scrollbar-thumb-scrollbars scrollbar-corner-background scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-h-2 hover:scrollbar-track-scrollbars-accent hover:scrollbar-thumb-scrollbars-accent-foreground mobile:pl-2 desktop:pl-1.5",
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
