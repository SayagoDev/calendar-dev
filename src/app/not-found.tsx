import { Button } from "@/components/ui/button";
import { CalendarX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <CalendarX className="size-24 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Página no encontrada</h2>
          <p className="text-muted-foreground">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Ir al inicio</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/events">Ver eventos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
