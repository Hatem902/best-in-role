"use client";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandTitle,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roles } from "@/config";
import { usePlayersQuery, useUserVoteQuery } from "@/hooks/queries";
import { PlayerCard } from "@/components/player-card";
import { LucideMousePointerClick } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogTrigger } from "./ui/dialog";
import Auth from "./auth";

const RoleColumn = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { role: (typeof roles)[number] }
>(({ role, className, ...props }, ref) => {
  const { data: players } = usePlayersQuery(role);
  const { data: userVote } = useUserVoteQuery(role);
  return (
    <div
      className={cn("flex w-[19.5rem] flex-col", className)}
      key={role}
      ref={ref}
      {...props}
    >
      <CardHeader
        className={cn(
          "hidden whitespace-nowrap mobile:flex",
          role !== "top" ? "invisible z-50 overflow-x-clip" : "z-40",
        )}
      >
        <CardTitle>Your Best in Role Pick&apos;ems for Worlds 2023</CardTitle>
        <CardDescription>
          Click
          <span>
            <LucideMousePointerClick className="mx-1 inline h-4 w-4" />
          </span>
          on a pro-player from the Best in Role Leader Board, in order to vote.
          {userVote === null && (
            <span>
              {" "}
              <Dialog>
                <DialogTrigger className="underline underline-offset-4 hover:text-primary">
                  Sign-in
                </DialogTrigger>
                <Auth />
              </Dialog>{" "}
              is required.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardHeader className=" mb-0.5 items-center mobile:hidden">
        <CardTitle>Your BiR {role.toUpperCase()} for Worlds 2023</CardTitle>
        <CardDescription className="text-center">
          {userVote === null && (
            <span>
              {" "}
              <Dialog>
                <DialogTrigger className="underline underline-offset-4 hover:text-primary">
                  Sign-in
                </DialogTrigger>
                <Auth />
              </Dialog>{" "}
              is required.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <Command className="h-fit w-full border shadow-md">
        <PlayerCard
          nullablePlayer={userVote?.id ? userVote : undefined}
          isInLadder={false}
          role={role}
          votedPlayerId={userVote?.id}
          userIsSignedIn={userVote !== null}
        ></PlayerCard>
      </Command>
      <CardHeader
        className={cn(
          "hidden  whitespace-nowrap mobile:flex",
          role !== "top" && "invisible overflow-x-clip",
        )}
      >
        <CardTitle>Best in Role Leader Board - Worlds 2023 </CardTitle>
        <CardDescription>
          All Worlds 2023 pro-players from the most voted to the least voted.
        </CardDescription>
      </CardHeader>
      <Command className="w-full  rounded-lg border shadow-md">
        <CommandTitle>
          <Image
            src={`/assets/images/roles/${role}.png`}
            width={23}
            height={23}
            alt={`The best ${role} pro-players at the League of Legends Worlds 2023, ranked by the number of votes they received.`}
          />
        </CommandTitle>
        <CommandInput placeholder={`Search ${role}...`} />
        <CommandList>
          <CommandEmpty>No {role} players found.</CommandEmpty>
          {players?.map((player) => (
            <PlayerCard
              nullablePlayer={player}
              isInLadder={true}
              role={role}
              votedPlayerId={userVote?.id}
              key={player.id}
              userIsSignedIn={userVote !== null}
            />
          ))}
        </CommandList>
      </Command>
    </div>
  );
});
RoleColumn.displayName = "RoleColumn";

export default RoleColumn;
