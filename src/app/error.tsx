"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertCircle className="size-24 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Algo salió mal</h1>
          <p className="text-muted-foreground">
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} size="lg">
            Intentar de nuevo
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/">Ir al inicio</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
