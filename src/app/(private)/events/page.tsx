import { Container } from "@/components/Container";
import { CopyEventButton } from "@/components/CopyEventButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getEvents } from "@/data/user/user-get-events";
import { formatEventDescription } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function EventsPage() {
  return (
    <>
      <div className="flex gap-4 items-baseline">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">
          Eventos
        </h1>
        <Button asChild>
          <Link href="/events/new" className="text-lg">
            <CalendarPlus className="size-5" />
            Nuevo Evento
          </Link>
        </Button>
      </div>
      <Suspense fallback={<EventsSkeleton />}>
        <RenderEvents />
      </Suspense>
    </>
  );
}

function EventsSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex flex-col">
          <CardHeader>
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/4" />
          </CardContent>
          <CardFooter className="flex justify-end gap-2 mt-auto">
            <Skeleton className="h-8 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

async function RenderEvents() {
  const events = await getEvents();

  return (
    <>
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="size-16 mx-auto" />
          No tienes ningún evento creado aún. Crea uno para empezar a agendar
          citas.
          <Button size="lg" className="text-lg" asChild>
            <Link href="/events/new" className="text-lg">
              <CalendarPlus className="size-5" />
              Nuevo Evento
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card className={cn("flex flex-col", !isActive && "border-secondary/50")}>
      <CardHeader className={cn(!isActive && "opacity-50")}>
        <CardTitle className="truncate" title={name}>
          {name}
        </CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description && (
        <CardContent
          className={cn("wrap-break-words", !isActive && "opacity-50")}
        >
          {description}
        </CardContent>
      )}
      <CardFooter className="flex flex-wrap justify-end gap-2 mt-auto">
        {isActive && (
          <CopyEventButton
            variant="outline"
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}
        <Button asChild>
          <Link href={`/events/${id}/edit`}>Editar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
