"use server";

import "use-server";
import { eventFormSchema, EventFormSchemaType } from "@/app/schema/events";
import { requireUser } from "@/data/user/require-user";
import { db } from "@/drizzle/db";
import { EventTable } from "@/drizzle/schema";
import { APIResponse } from "@/lib/types";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createEvent(
  unsafeData: EventFormSchemaType
): Promise<APIResponse> {
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success) {
    return {
      status: "error",
      message: "Datos inválidos",
    };
  }

  const userId = await requireUser();

  try {
    await db.insert(EventTable).values({ ...data, clerkUserId: userId });

    revalidatePath("/events");

    return {
      status: "success",
      message: "Evento creado correctamente",
    };
  } catch {
    return {
      status: "error",
      message: "Error al crear el evento. Por favor, inténtalo de nuevo.",
    };
  }
}

export async function updateEvent(
  id: string,
  unsafeData: EventFormSchemaType
): Promise<APIResponse> {
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success) {
    return {
      status: "error",
      message: "Datos inválidos",
    };
  }

  const userId = await requireUser();

  try {
    const { rowCount } = await db
      .update(EventTable)
      .set({ ...data })
      .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)));

    if (rowCount === 0) {
      return {
        status: "error",
        message: "Evento no actualizado",
      };
    }

    revalidatePath("/events");

    return {
      status: "success",
      message: "Evento actualizado correctamente",
    };
  } catch {
    return {
      status: "error",
      message: "Error al actualizar el evento. Por favor, inténtalo de nuevo.",
    };
  }
}

export async function deleteEvent(id: string): Promise<APIResponse> {
  const userId = await requireUser();
  try {
    await db
      .delete(EventTable)
      .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)));

    revalidatePath("/events");

    return {
      status: "success",
      message: "Evento eliminado correctamente",
    };
  } catch {
    return {
      status: "error",
      message: "Error al eliminar el evento. Por favor, inténtalo de nuevo.",
    };
  }
}
