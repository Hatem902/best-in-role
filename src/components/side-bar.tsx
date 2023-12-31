import { LucideGithub, LucideMoreHorizontal } from "lucide-react";
import { User, currentUser } from "@clerk/nextjs/server";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import SignOutButton from "@/components/sign-out-button";
import SignInButton from "@/components/sign-in-button";

export default async function SideBar() {
  const user: User | null = await currentUser();
  return (
    <Sheet>
      <SheetTrigger className="fixed right-4 top-4 z-50 cursor-pointer border border-transparent p-1 opacity-sheettrigger outline-none  transition-all hover:rounded-full hover:border-inherit hover:bg-accent hover:bg-opacity-100 hover:text-accent-foreground hover:opacity-sheettrigger_accent hover:backdrop-blur-sm">
        <LucideMoreHorizontal />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between pt-28">
        <div>
          <div className="flex items-center space-x-2">
            {user && (
              <Image
                className="rounded-full"
                src={user?.imageUrl}
                alt="Picture of the user"
                width={42}
                height={42}
              />
            )}
            <CardHeader className="py-0">
              <CardTitle>
                {user?.firstName || "Signed out"} {user?.lastName || ""}
              </CardTitle>
              <CardDescription>
                {user?.emailAddresses[0].emailAddress ||
                  "Sign in and vote for your best in role players"}
              </CardDescription>
            </CardHeader>
          </div>
          <Separator className="mt-14" />
          <div className="mt-10 flex flex-col space-y-8">
            {user ? <SignOutButton /> : <SignInButton />}
            <Link
              href="https://github.com/Hatem902/best-in-role"
              target="_blank"
              className="flex w-full"
            >
              <Button variant="outline" className="w-full">
                <LucideGithub className="mr-2.5 h-4 w-4" />
                Give my Repo a Star
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
        <div>
          <Separator />
          <div className="mt-2 flex justify-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Hatem Tommy Lamine. All Rights
            Reserved.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
