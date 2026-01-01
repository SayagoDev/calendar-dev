import { MeetingForm } from "@/components/forms/MeetingForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEventActive } from "@/data/user/user-get-event-active";
import Link from "next/link";

type Params = Promise<{ clerkUserId: string; eventId: string }>;

export default async function BookEventPage({ params }: { params: Params }) {
  const { clerkUserId, eventId } = await params;
  const {
    data: event,
    calendarUser,
    validTimes,
  } = await getEventActive(clerkUserId, eventId);

  if (validTimes.length === 0)
    return <NoTimeSlots event={event} calendarUser={calendarUser} />;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          Reserva {event.name} con {calendarUser.fullName}
        </CardTitle>
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <MeetingForm
          validTimes={validTimes}
          eventId={eventId}
          clerkUserId={clerkUserId}
        />
      </CardContent>
    </Card>
  );
}

function NoTimeSlots({
  event,
  calendarUser,
}: {
  event: { name: string; description: string | null };
  calendarUser: { id: string; fullName: string | null };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Reserva {event.name} con {calendarUser.fullName}
        </CardTitle>
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {calendarUser.fullName} no tiene horarios disponibles por el momento.
        Por favor, vuelve a intentarlo más tarde o elige un evento más corto.
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/book/${calendarUser.id}`}>Elije otro evento</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
