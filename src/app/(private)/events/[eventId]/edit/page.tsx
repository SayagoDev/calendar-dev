import { EventForm } from "@/components/forms/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEvent } from "@/data/user/user-get-event";
import { notFound } from "next/navigation";

type Params = Promise<{ eventId: string }>;

export default async function EditEventPage({ params }: { params: Params }) {
  const { eventId } = await params;
  const event = await getEvent(eventId);

  if (!event) return notFound();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Editar Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm event={event} />
      </CardContent>
    </Card>
  );
}
