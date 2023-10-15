"use client";
import { SignIn, useSignIn } from "@clerk/nextjs";

export default function Page() {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) {
    return null;
  }
  const signInWithGoogle = () =>
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  return (
    <main className="mt-[20vh]">
      <SignIn />
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </main>
  );
}
