import { startOfDay } from "date-fns";
import z from "zod";

export const meetingFormSchema = z.object({
  startTime: z.date().min(new Date()),
  guestEmail: z.email().min(1, { message: "Es requerido" }),
  guestName: z.string().min(1, { message: "Es requerido" }),
  guestNotes: z.string().optional(),
  timezone: z.string().min(1, { message: "Es requerido" }),
  date: z.date().min(startOfDay(new Date()), {
    message: "La fecha debe ser mayor a la fecha actual",
  }),
});

export const meetingActionSchema = z
  .object({
    eventId: z.string().min(1, { message: "Es requerido" }),
    clerkUserId: z.string().min(1, { message: "Es requerido" }),
  })
  .and(meetingFormSchema.omit({ date: true }));

export type MeetingFormSchemaType = z.input<typeof meetingFormSchema>;
export type MeetingActionSchemaType = z.input<typeof meetingActionSchema>;
