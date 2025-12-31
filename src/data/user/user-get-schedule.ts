import { db } from "@/drizzle/db";
import { requireUser } from "./require-user";

export async function getSchedule() {
  const userId = await requireUser();

  const data = db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: {
      availabilities: true,
    },
  });

  return data;
}

export type UserScheduleType = Awaited<ReturnType<typeof getSchedule>>;
