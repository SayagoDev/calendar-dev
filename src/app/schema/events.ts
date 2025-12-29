import z from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1, "required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  durationInMinutes: z.coerce
    .number()
    .int()
    .positive("La duración debe ser mayor a 0")
    .max(
      60 * 12,
      `La duración no puede ser mayor a 12 horas (${60 * 12} minutos)`
    ),
});

export type EventFormSchemaType = z.input<typeof eventFormSchema>;
