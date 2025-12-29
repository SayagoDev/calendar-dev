import { auth } from "@clerk/nextjs/server";
import "server-only";

export async function requireUser() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return userId;
}
