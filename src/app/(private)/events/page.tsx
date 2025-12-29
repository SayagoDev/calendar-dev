import { Button } from "@/components/ui/button";
import { getEvents } from "@/data/user/user-get-events";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";

export default async function EventsPage() {
  const events = await getEvents();

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
      {events.length > 0 ? (
        <h1>Eventos</h1>
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
