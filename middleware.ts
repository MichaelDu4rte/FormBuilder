import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Configurações opcionais
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};