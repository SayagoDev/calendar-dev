"use server";

import {
  scheduleFormSchema,
  ScheduleFormSchemaType,
} from "@/app/schema/schedule";
import { requireUser } from "@/data/user/require-user";
import { db } from "@/drizzle/db";
import { ScheduleAvailabilityTable, ScheduleTable } from "@/drizzle/schema";
import { APIResponse } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveSchedule(
  unsafeData: ScheduleFormSchemaType
): Promise<APIResponse> {
  const { success, data } = scheduleFormSchema.safeParse(unsafeData);

  if (!success) {
    return {
      status: "error",
      message: "Datos inválidos",
    };
  }

  const userId = await requireUser();

  try {
    const { availabilities, ...scheduleData } = data;

    const [{ id: scheduleId }] = await db
      .insert(ScheduleTable)
      .values({ ...scheduleData, clerkUserId: userId })
      .onConflictDoUpdate({
        target: ScheduleTable.clerkUserId,
        set: scheduleData,
      })
      .returning({ id: ScheduleTable.id });

    await db.transaction(async (tx) => {
      await tx
        .delete(ScheduleAvailabilityTable)
        .where(eq(ScheduleAvailabilityTable.scheduleId, scheduleId));

      if (availabilities.length > 0) {
        await tx.insert(ScheduleAvailabilityTable).values(
          availabilities.map((availability) => ({
            ...availability,
            scheduleId,
          }))
        );
      }
    });

    revalidatePath("/schedule");

    return {
      status: "success",
      message: "Horario guardado correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Occurrio un error insperado. Por favor, inténtalo de nuevo",
    };
  }
}
