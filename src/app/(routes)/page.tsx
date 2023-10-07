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

export default function Home() {
  return (
    <main className="my-4 flex  w-full justify-center space-x-1.5 px-0.5 ">
      {roles.map((role, index) => {
        const { data: players } = usePlayersQuery(role);
        const { data: userVote } = useUserVoteQuery(role);
        const roleImage = require(`@/assets/images/roles/${role}.png`);
        return (
          <div
            className="flex w-full max-w-[19.5rem] flex-col 3xl:max-w-[19.5rem]"
            key={role}
          >
            <CardHeader
              className={cn(
                " whitespace-nowrap",
                index !== 0 && "collapse overflow-x-clip",
              )}
            >
              <CardTitle>Your Best in Role Pick&apos;ems</CardTitle>
              <CardDescription className=" ">
                Click
                <span>
                  <LucideMousePointerClick className="mx-1 inline h-4 w-4" />
                </span>
                on a player from the Best in Role Leader Board, in order to
                vote.
              </CardDescription>
            </CardHeader>
            <Command className="h-fit w-full    border shadow-md">
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
                index !== 0 && "collapse overflow-x-clip",
              )}
            >
              <CardTitle>Best in Role Leader Board</CardTitle>
              <CardDescription>
                All Worlds 2023 players from the most voted to the least voted.
              </CardDescription>
            </CardHeader>
            <Command className="w-full  rounded-lg border shadow-md">
              <CommandTitle>
                <Image src={roleImage} width={23} height={23} alt={role} />
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
      })}
    </main>
  );
}
