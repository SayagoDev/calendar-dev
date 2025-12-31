import { db } from "@/drizzle/db";
import { requireUser } from "./require-user";

export async function getEvent(eventId: string) {
  const userId = await requireUser();

  const data = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(clerkUserId, userId), eq(id, eventId)),
  });

  return data;
}

export type UserEventType = Awaited<ReturnType<typeof getEvent>>;
