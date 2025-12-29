import "server-only";
import { requireUser } from "./require-user";
import { db } from "@/drizzle/db";

export async function getEvents() {
  const userId = await requireUser();

  const data = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return data;
}

export type UserEventsType = Awaited<ReturnType<typeof getEvents>>;
