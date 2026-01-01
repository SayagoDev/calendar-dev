import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import "server-only";

export const requireUser = cache(async () => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return userId;
});
