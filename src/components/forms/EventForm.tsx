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

export function EventForm() {
  const form = useForm<EventFormSchemaType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      isActive: true,
      durationInMinutes: 30,
    },
  });

  function onSubmit(values: EventFormSchemaType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
      </form>
    </Form>
  );
}
