"use client";
import * as React from "react";
import ReactCountryFlag from "react-country-flag";
import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CardDescription } from "@/components/ui/card";
import { PlayerWithVoteStats } from "@/types/player";
import { roles } from "@/config";
import { LucideArrowUp } from "lucide-react";
import { useRemoveVoteMutation, useVoteMutation } from "@/hooks/queries";
import { useSignIn } from "@clerk/nextjs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import dynamic from "next/dynamic";

const Auth = dynamic(() => import("@/components/auth"));

interface PlayerCardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  nullablePlayer: PlayerWithVoteStats | undefined;
  votedPlayerId: string | undefined;
  role: (typeof roles)[number];
  isInLadder: boolean;
  userIsSignedIn: boolean;
}

const PlayerCardContent = React.forwardRef<HTMLDivElement, PlayerCardProps>(
  (
    {
      nullablePlayer,
      votedPlayerId,
      role,
      isInLadder,
      userIsSignedIn,
      className,
      ...props
    },
    ref,
  ) => {
    const { mutate: Vote } = useVoteMutation(role);
    const { mutate: RemoveVote } = useRemoveVoteMutation(role);
    const { signIn } = useSignIn();
    const signInWithGoogle = () =>
      signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    const player = nullablePlayer!;

    return (
      <div className={className} {...props} ref={ref}>
        {/*TODO: use hights and widhts instead of paddings so that if the children change, the total card widghts and hights stay the same. Then remove code repetition by moving the ternaries to the deepest children */}
        {isInLadder || nullablePlayer ? (
          <div
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
            onClick={
              userIsSignedIn
                ? nullablePlayer
                  ? player.id === votedPlayerId
                    ? () => RemoveVote()
                    : () => Vote(player.id)
                  : undefined
                : undefined
            }
          >
            <CommandGroup>
              <CommandItem
                className={cn(
                  isInLadder &&
                    votedPlayerId === player.id &&
                    "bg-playercard_low_accent text-accent-foreground",
                  isInLadder ? "pb-3.5" : "pb-[1.375rem]",
                )}
              >
                {isInLadder || (!isInLadder && nullablePlayer) ? (
                  /* TODO: Remove const player = nullablePlayer! and only user player param as is. assertion (it's there due to typescript inference bug?) */
                  <div className="flex w-full  items-start space-x-3.5">
                    <ReactCountryFlag
                      countryCode={player.region}
                      svg
                      style={{
                        width: "2.8em",
                        height: "2.8em",
                      }}
                      title={player.region.toUpperCase()}
                      className="pb-2"
                    />

                    <div className="flex w-full flex-col justify-center">
                      <div className="flex justify-between text-sm font-medium leading-none">
                        <p className="mr-1.5 max-w-[15rem]">
                          {player.team} {player.name}
                        </p>
                        <p>#{player.rank}</p>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <p>
                          <LucideArrowUp
                            className={cn(
                              "-ml-0.5 -mt-0.5 mr-0.5 inline h-3.5 w-3.5",
                              votedPlayerId === player.id &&
                                "animate-bounce-timed text-highlight",
                            )}
                          />
                          {player.voteCount} vote
                          <span>{player.voteCount !== 1 && "s"}</span>
                        </p>
                        <p>{player.votePercentage.toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CardDescription>Pick {role}</CardDescription>
                )}
              </CommandItem>
            </CommandGroup>
            {isInLadder && <CommandSeparator />}
          </div>
        ) : (
          <div>
            <CommandGroup>
              <CommandItem
                className={cn(
                  "relative cursor-default ",
                  isInLadder ? "pb-3.5" : "pb-[1.375rem]",
                )}
              >
                <p className="absolute left-0 right-0 m-auto flex items-center justify-center pb-2 text-xs text-muted-foreground">
                  No Vote
                </p>

                <div className="invisible flex  w-full items-start space-x-3.5">
                  <ReactCountryFlag
                    countryCode="us"
                    svg
                    style={{
                      width: "2.8em",
                      height: "2.8em",
                    }}
                    title="US"
                    className="pb-2"
                  />

                  <div className="flex w-full flex-col justify-center">
                    <div className="flex justify-between text-sm font-medium leading-none">
                      <p className="mr-1.5 max-w-[14rem]">Team & Name</p>
                      <p>Rank</p>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <p>Votes</p>
                      <p>%</p>
                    </div>
                  </div>
                </div>
              </CommandItem>
            </CommandGroup>
            {isInLadder && <CommandSeparator />}
          </div>
        )}
      </div>
    );
  },
);
PlayerCardContent.displayName = "PlayerCardContent";

const PlayerCard = React.forwardRef<HTMLDivElement, PlayerCardProps>(
  ({ userIsSignedIn, isInLadder, ...props }, ref) => {
    return (
      <>
        {userIsSignedIn || !isInLadder ? (
          <PlayerCardContent
            userIsSignedIn={userIsSignedIn}
            isInLadder={isInLadder}
            {...props}
            ref={ref}
          />
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <PlayerCardContent
                userIsSignedIn={userIsSignedIn}
                isInLadder={isInLadder}
                {...props}
                ref={ref}
              />
            </DialogTrigger>
            <Auth />
          </Dialog>
        )}
      </>
    );
  },
);
PlayerCard.displayName = "PlayerCard";

export { PlayerCard };
