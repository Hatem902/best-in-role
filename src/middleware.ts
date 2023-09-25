import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
