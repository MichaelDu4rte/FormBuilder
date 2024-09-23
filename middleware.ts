// middleware.ts
import { authMiddleware } from "@clerk/nextjs/server";

// This is where you can define optional configurations for the middleware
export default authMiddleware({
  // Optional: You can specify additional configurations if needed
});

// This configuration determines which routes the middleware will apply to
export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!.+\\.[\\w]+$|_next).*)", // This will exclude files with an extension and _next folder
    "/",
    "/(api|trpc)(.*)", // This matches all API routes
  ],
};
