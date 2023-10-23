import { LucideBookLock, LucideInfo } from "lucide-react";
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import SignInButton from "@/components/sign-in-button";

const Auth = () => {
  return (
    <DialogContent>
      <div className="container relative  grid h-[516px] w-max items-center  justify-center px-0 md:grid lg:max-w-none lg:grid-cols-2 laptop_sm:h-[548px] laptop:h-[620px] desktop:h-[800px]">
        <div className="relative order-2 flex h-full  flex-col overflow-hidden bg-muted  p-10 text-white dark:border-t lg:order-none dark:lg:border-r ">
          <Image
            src="/assets/images/auth-bg.jpg"
            alt="Authentication"
            fill
            style={{
              objectFit: "cover",
            }}
            className="absolute inset-0"
          />
          <div className="relative z-20 flex items-center text-lg font-medium ">
            Best in Role — Worlds 2023
            <br />
            League of Legends
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Smoke the doubters. The whole pack.&rdquo;
              </p>
              <footer className="text-sm">Caedrel</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex  w-[350px] flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in &nbsp;&&nbsp; Vote
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in in order to vote for your BiR players
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <SignInButton />
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline">
                    <LucideInfo className="mr-2 h-4 w-4" />
                    Why is sign-in required?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex justify-between space-x-4">
                    <div>
                      <LucideBookLock className="h-16 w-16 text-muted " />
                    </div>
                    <div className="max-w-prose space-y-1 text-sm text-muted-foreground">
                      <p className="">
                        • To counteract instances of cheating, botting, and
                        spam-voting associated with a single player, and to
                        ensure that users can only cast one vote per role, we
                        implement a swift sign-in process.
                      </p>
                      <p>
                        • This enables us to monitor the accounts from which
                        votes originate, thereby thwarting any attempts at
                        dishonest practices.
                      </p>

                      {/* <p className="pt-0.5 text-xs">BiR &trade;</p> */}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            {/* <div>
              <Separator />
              <p className="px-16 pt-2 text-center text-xs text-muted-foreground">
                By signing in, you agree to our terms of service and privacy
                policy.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default Auth;
