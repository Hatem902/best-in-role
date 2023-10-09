import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="mt-[20vh]">
      <SignIn />
    </main>
  );
}
