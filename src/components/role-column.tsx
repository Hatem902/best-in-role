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

const RoleColumn = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { role: (typeof roles)[number] }
>(({ role, className, ...props }, ref) => {
  const { data: players } = usePlayersQuery(role);
  const { data: userVote } = useUserVoteQuery(role);
  return (
    <div
      className={cn(
        "flex w-[19.5rem] flex-col",
        role === "top" ? "pl-6" : role === "sup" ? "pr-6" : "",
        className,
      )}
      key={role}
      ref={ref}
      {...props}
    >
      <CardHeader
        className={cn(
          "whitespace-nowrap",
          role !== "top" && "invisible overflow-x-clip",
        )}
      >
        <CardTitle>Your Best in Role Pick&apos;ems for Worlds 2023</CardTitle>
        <CardDescription className=" ">
          Click
          <span>
            <LucideMousePointerClick className="mx-1 inline h-4 w-4" />
          </span>
          on a pro-player from the Best in Role Leader Board, in order to vote.
        </CardDescription>
      </CardHeader>
      <Command className="h-fit w-full border shadow-md">
        <PlayerCard
          nullablePlayer={userVote}
          isInLadder={false}
          role={role}
          votedPlayerId={userVote?.id}
        ></PlayerCard>
      </Command>
      <CardHeader
        className={cn(
          "whitespace-nowrap",
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
            />
          ))}
        </CommandList>
      </Command>
    </div>
  );
});
RoleColumn.displayName = "RoleColumn";

export { RoleColumn };
