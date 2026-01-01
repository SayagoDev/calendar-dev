import "server-only";
import { db } from "@/drizzle/db";
import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export async function getEventsActive(userId: string) {
  const data = await db.query.EventTable.findMany({
    where: ({ clerkUserId, isActive }, { eq, and }) =>
      and(eq(clerkUserId, userId), eq(isActive, true)),
    orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
  });

  if (data.length === 0) return notFound();

  const { fullName } = await (await clerkClient()).users.getUser(userId);

  return { data, fullName };
}

export type UserEventsActiveType = Awaited<ReturnType<typeof getEventsActive>>;
