"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, EventFormSchemaType } from "@/app/schema/events";
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
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { UserEventType } from "@/data/user/user-get-event";
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

export function EventForm({ event }: { event?: UserEventType }) {
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();
  const router = useRouter();

  const form = useForm<EventFormSchemaType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ?? {
      name: "",
      description: "",
      isActive: true,
      durationInMinutes: 30,
    },
  });

  async function onSubmit(values: EventFormSchemaType) {
    startTransition(async () => {
      const action =
        event == null
          ? createEvent
          : updateEvent.bind(null, event.id as string);
      const { data: result, error } = await tryCatch(action(values));

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

  async function onDelete(eventId: string) {
    startDeleteTransition(async () => {
      const { data: result, error } = await tryCatch(deleteEvent(eventId));

      if (error) {
        toast.error(
          "Occurrio un error insperado. Por favor, inténtalo de nuevo"
        );
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/events");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del evento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                El nombre que los usuarios verán en el calendario.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationInMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duración del evento</FormLabel>
              <FormControl>
                <Input type="number" {...field} value={field.value as number} />
              </FormControl>
              <FormDescription>En minutos</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del evento</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none h-32" />
              </FormControl>
              <FormDescription>Descripción opcional del evento</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Activo</FormLabel>
              </div>
              <FormDescription>
                Eventos inactivos no se mostrarán en el calendario
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          {event && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructiveGhost" disabled={pending}>
                  Eliminar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no puede ser deshecha. Esto eliminará el evento
                    permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={deletePending}
                    onClick={() => onDelete(event.id as string)}
                    variant="destructive"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
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
