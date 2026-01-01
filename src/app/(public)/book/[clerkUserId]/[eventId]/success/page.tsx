import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEventActive } from "@/data/user/user-get-event-active";
import { formatDateTime } from "@/lib/formatters";

type Params = Promise<{
  clerkUserId: string;
  eventId: string;
  startTime: string;
}>;

type SearchParams = Promise<{
  startTime: string;
}>;

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { clerkUserId, eventId } = await params;
  const { startTime } = await searchParams;

  const startTimeDate = new Date(startTime);
  const event = await getEventActive(clerkUserId, eventId);

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          Reserva exitosa para {event.data.name} con{" "}
          {event.calendarUser.fullName}
        </CardTitle>
        <CardDescription className="text-lg">
          {formatDateTime(startTimeDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-lg">
        Deberías recibir un correo electrónico con los detalles de la reserva.
        Puedes cerrar esta página.
      </CardContent>
    </Card>
  );
}
