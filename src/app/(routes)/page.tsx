"use client";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandTitle,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { roles } from "@/config";
import { useVoteMutation, useVotesQuery } from "@/hooks/queries";
import { PlayerCard } from "@/components/player-card";

export default function Home() {
  const { isLoading: isLoadingVotes, data: votes } = useVotesQuery();
  return (
    <>
      <main className=" -mt-12 flex w-full  justify-center space-x-2.5 px-0.5 3xl:space-x-4">
        {roles.map((role, index) => (
          <div key={role}>
            <h2
              className={cn(
                "pb-3 pt-7 text-3xl font-bold tracking-tight",
                index !== 0 && "invisible",
              )}
            >
              Your Best in Role Pick&apos;ems
            </h2>
            <Command className="h-fit w-full   max-w-[20rem] border border-ring shadow-md">
              <PlayerCard
                nullablePlayer={votes?.user[role]}
                isInLadder={false}
                role={role}
                votedPlayerId={votes?.user[role]?.id}
              ></PlayerCard>
            </Command>
            <h2
              className={cn(
                "pb-3 pt-7 text-3xl font-bold tracking-tight",
                index !== 0 && "invisible",
              )}
            >
              Best in Role Leader Board
            </h2>
            <Command
              className="w-full max-w-[20rem] rounded-lg border shadow-md"
              key={role}
            >
              <CommandTitle>{role.toUpperCase()}</CommandTitle>
              <CommandInput
                placeholder={cn(
                  "Search your best-in-role ",
                  role.toUpperCase(),
                )}
              />
              <CommandList>
                <CommandEmpty>No Players found.</CommandEmpty>
                <CommandGroup>
                  {votes?.players[role].map((player) => (
                    <PlayerCard
                      nullablePlayer={player}
                      isInLadder={true}
                      role={role}
                      votedPlayerId={votes.user[role]?.id}
                      key={player.id}
                    />
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        ))}
      </main>
    </>
  );
}
