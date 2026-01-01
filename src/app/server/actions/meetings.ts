"use server";

import {
  meetingActionSchema,
  MeetingActionSchemaType,
} from "@/app/schema/meetings";
import { db } from "@/drizzle/db";
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule";
import { APIResponse } from "@/lib/types";
import { createCalendarEvent } from "../googleCalendar";
import { fromZonedTime } from "date-fns-tz";
import { revalidatePath } from "next/cache";

export async function createMeeting(
  unsafeData: MeetingActionSchemaType
): Promise<APIResponse> {
  const { success, data } = meetingActionSchema.safeParse(unsafeData);

  if (!success) {
    return {
      status: "error",
      message: "Datos inválidos",
    };
  }

  try {
    const event = await db.query.EventTable.findFirst({
      where: ({ clerkUserId, isActive, id }, { eq, and }) =>
        and(
          eq(clerkUserId, data.clerkUserId),
          eq(isActive, true),
          eq(id, data.eventId)
        ),
    });

    if (!event)
      return {
        status: "error",
        message: "Evento no encontrado",
      };

    const startInTimezone = fromZonedTime(data.startTime, data.timezone);

    const validTimes = await getValidTimesFromSchedule(
      [startInTimezone],
      event
    );
    if (validTimes.length === 0)
      return {
        status: "error",
        message: "No hay tiempos disponibles para la fecha y hora seleccionada",
      };

    await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
    });

    revalidatePath(`/book/${data.clerkUserId}/${data.eventId}`);

    return {
      status: "success",
      message: "Reserva creada correctamente.",
    };
  } catch {
    return {
      status: "error",
      message: "Error al crear la reserva. Por favor, inténtalo de nuevo.",
    };
  }
}
