"use client";
import * as React from "react";
import ReactCountryFlag from "react-country-flag";
import { CommandItem, CommandSeparator } from "@/components/ui/command";
import { cn, Modify } from "@/lib/utils";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useRemoveVoteMutation, useVoteMutation } from "@/hooks/queries";
import { PlayerWithVoteStats } from "@/types/votes";
import { roles } from "@/config";

interface inLadderPlayerCardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  nullablePlayer: PlayerWithVoteStats;
  votedPlayerId: number;
  role: (typeof roles)[number];
  isInLadder: true;
}

interface notInLadderPlayerCardProps
  extends Modify<
    inLadderPlayerCardProps,
    {
      nullablePlayer: PlayerWithVoteStats | undefined;
      votedPlayerId: number | undefined;
      isInLadder: false;
    }
  > {}

export type PlayerCardProps =
  | inLadderPlayerCardProps
  | notInLadderPlayerCardProps;

const PlayerCard = React.forwardRef<HTMLDivElement, PlayerCardProps>(
  (
    { nullablePlayer, votedPlayerId, role, isInLadder, className, ...props },
    ref,
  ) => {
    const { isLoading: isLoadingVote, mutate: Vote } = useVoteMutation();
    const { isLoading: isLoadingRemoveVote, mutate: RemoveVote } =
      useRemoveVoteMutation();
    const player = nullablePlayer!;

    return (
      <div
        className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
        onClick={
          nullablePlayer
            ? player.id === votedPlayerId
              ? () => RemoveVote(role)
              : () =>
                  Vote({
                    role,
                    playerId: player.id,
                  })
            : undefined
        }
        {...props}
        ref={ref}
      >
        <CommandItem
          className={cn(
            ((isInLadder && votedPlayerId === nullablePlayer.id) ||
              (!isInLadder && !nullablePlayer)) &&
              "border border-ring",
          )}
        >
          {isInLadder || (!isInLadder && nullablePlayer) ? (
            /* TODO: Remove nullablePlayer! and only user player param as is. assertion (it's there due to typescript inference bug?) */
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full space-x-3">
                <ReactCountryFlag
                  countryCode={player.region}
                  svg
                  style={{
                    width: "4em",
                    height: "4em",
                  }}
                  title="US"
                  className="max-w-[2em] pb-[1.3rem] 3xl:max-w-none 3xl:pb-0"
                />

                <div className="flex w-full flex-col justify-center">
                  <div className="flex justify-between">
                    <CardTitle className="mr-1.5 max-w-[12rem]">
                      {player.team} {player.name}
                      {/*  T T T E ST TES TT */}
                    </CardTitle>
                    <CardTitle>#{player.rank}</CardTitle>
                  </div>
                  <div className="flex justify-between">
                    <CardDescription className="text-highlight">
                      Votes : {player.voteCount}
                    </CardDescription>
                    <CardDescription>
                      {player.votePercentage.toFixed(2)}%
                    </CardDescription>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <CardDescription className="">Pick {role}</CardDescription>
          )}
        </CommandItem>
        {isInLadder && <CommandSeparator />}
      </div>
    );
  },
);
PlayerCard.displayName = "PlayerCard";

export { PlayerCard };
