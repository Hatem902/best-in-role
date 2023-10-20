import { authMiddleware } from "@clerk/nextjs";
import { roles } from "./config";

export default authMiddleware({
  //TODO: add middlewares for repeated route handlers code
  /* async afterAuth(auth, request) {
    const { userId } = auth;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await clerkClient.users.getUser(userId);
    return NextResponse.next()
  }, */
  publicRoutes: [
    "/",
    "/sso-callback",
    ...roles.flatMap((role) => [`/api/${role}`, `/api/current-user/${role}`]),
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
