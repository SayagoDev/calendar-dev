import "server-only";
import { db } from "@/drizzle/db";
import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import {
  addMonths,
  eachMinuteOfInterval,
  endOfDay,
  roundToNearestMinutes,
} from "date-fns";
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule";

export async function getEventActive(userId: string, eventId: string) {
  const data = await db.query.EventTable.findFirst({
    where: ({ clerkUserId, isActive, id }, { eq, and }) =>
      and(eq(isActive, true), eq(clerkUserId, userId), eq(id, eventId)),
  });

  if (data == null) return notFound();

  const calendarUser = await (await clerkClient()).users.getUser(userId);
  const startDate = roundToNearestMinutes(new Date(), {
    nearestTo: 15,
    roundingMethod: "ceil",
  });
  const endDate = endOfDay(addMonths(startDate, 2));

  const validTimes = await getValidTimesFromSchedule(
    eachMinuteOfInterval({ start: startDate, end: endDate }, { step: 15 }),
    data
  );

  return { data, calendarUser, validTimes };
}

export type UserEventActiveType = Awaited<ReturnType<typeof getEventActive>>;
