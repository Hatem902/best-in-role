"use client";
import { useSignIn } from "@clerk/nextjs";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const SignInButton = () => {
  const { signIn, isLoaded: signInIsLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const signInWithGoogle = () => {
    setIsLoading(true);
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };
  return (
    <Button onClick={signInWithGoogle} disabled={!signInIsLoaded || isLoading}>
      {!signInIsLoaded || isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
