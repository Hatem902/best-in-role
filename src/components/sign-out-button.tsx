"use client";
import { SignOutButton as SignOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LucideLogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Icons } from "./ui/icons";
const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  return (
    <SignOut
      signOutCallback={async () => {
        queryClient.setQueriesData(
          { predicate: (query) => query.queryKey[1] === "user_vote" },
          null,
        );
      }}
    >
      <Button
        onClick={() => setIsLoading(true)}
        variant="outline"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LucideLogOut className="mr-2.5 h-4 w-4" />
        )}
        Sign Out
      </Button>
    </SignOut>
  );
};

export default SignOutButton;
