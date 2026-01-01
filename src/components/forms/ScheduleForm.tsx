"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema } from "@/app/schema/events";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { tryCatch } from "@/lib/try-catch";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/app/server/actions/events";
import { Fragment, useMemo, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { UserScheduleType } from "@/data/user/user-get-schedule";
import {
  scheduleFormSchema,
  ScheduleFormSchemaType,
} from "@/app/schema/schedule";
import { timeToInt } from "@/lib/utils";
import { Combobox } from "../ui/combobox";
import { formatTimezoneOffset } from "@/lib/formatters";
import { DAY_OF_WEEK_IN_ORDER } from "@/data/constants";
import { saveSchedule } from "@/app/server/actions/schedule";

export function ScheduleForm({ schedule }: { schedule?: UserScheduleType }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ScheduleFormSchemaType>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      timezone:
        schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      availabilities: schedule?.availabilities.toSorted((a, b) => {
        return timeToInt(a.startTime) - timeToInt(b.startTime);
      }),
    },
  });

  const {
    append: addAvailability,
    remove: removeAvailability,
    fields: availabilityFields,
  } = useFieldArray({
    name: "availabilities",
    control: form.control,
  });

  const groupAvailabilityFields = Object.groupBy(
    availabilityFields.map((field, index) => ({ ...field, index })),
    (availability) => availability.dayOfWeek
  );

  // Memoizar las opciones de zona horaria para evitar recalcular en cada render
  const timezoneOptions = useMemo(() => {
    return Intl.supportedValuesOf("timeZone").map((timezone) => ({
      value: timezone,
      label: `${timezone} (${formatTimezoneOffset(timezone)})`,
    }));
  }, []); // Array vacío = solo calcular una vez

  async function onSubmit(values: ScheduleFormSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(saveSchedule(values));

      if (error) {
        toast.error(
          "Occurrio un error insperado. Por favor, inténtalo de nuevo"
        );
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/events");
        form.reset();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zona horaria</FormLabel>
              <FormControl>
                <Combobox
                  options={timezoneOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecciona una zona horaria"
                  searchPlaceholder="Buscar zona horaria..."
                  emptyMessage="No se encontró la zona horaria"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-[auto_1fr] gap-y-6 gap-x-4 ">
          {DAY_OF_WEEK_IN_ORDER.map((dayOfWeek) => (
            <Fragment key={dayOfWeek}>
              <div className="capitalize text-sm font-semibold">
                {dayOfWeek.substring(0, 3)}
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    addAvailability({
                      dayOfWeek,
                      startTime: "9:00",
                      endTime: "17:00",
                    });
                  }}
                  className="size-6 p-1"
                  variant="outline"
                >
                  <Plus className="size-4" />
                </Button>
                {groupAvailabilityFields[dayOfWeek]?.map(
                  (field, labelIndex) => (
                    <div className="flex flex-col gap-1" key={field.index}>
                      <div className="flex gap-2 items-center">
                        <FormField
                          control={form.control}
                          name={`availabilities.${field.index}.startTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-24"
                                  aria-label={`${dayOfWeek} Tiempo de inicio ${
                                    labelIndex + 1
                                  }`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        -
                        <FormField
                          control={form.control}
                          name={`availabilities.${field.index}.endTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-24"
                                  aria-label={`${dayOfWeek} Tiempo de fin ${
                                    labelIndex + 1
                                  }`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          className="size-6 p-1"
                          variant="destructiveGhost"
                          onClick={() => removeAvailability(field.index)}
                        >
                          <X />
                        </Button>
                      </div>
                      <FormMessage>
                        {
                          form.formState.errors.availabilities?.[field.index]
                            ?.message
                        }
                      </FormMessage>
                      <FormMessage>
                        {
                          form.formState.errors.availabilities?.[field.index]
                            ?.startTime?.message
                        }
                      </FormMessage>
                      <FormMessage>
                        {
                          form.formState.errors.availabilities?.[field.index]
                            ?.endTime?.message
                        }
                      </FormMessage>
                    </div>
                  )
                )}
              </div>
            </Fragment>
          ))}
        </div>

        <div className="flex gap-2 justify-end">
          <Button asChild variant="outline" type="button">
            <Link href="/events">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {"Guardando..."}
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
