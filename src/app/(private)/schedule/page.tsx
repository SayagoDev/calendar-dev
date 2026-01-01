import { ScheduleForm } from "@/components/forms/ScheduleForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSchedule } from "@/data/user/user-get-schedule";
import { Suspense } from "react";

export default function SchedulePage() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Horario</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<ScheduleSkeleton />}>
          <RenderSchedule />
        </Suspense>
      </CardContent>
    </Card>
  );
}

function ScheduleSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-sm mb-2 font-medium">Zona horaria</div>
        <div className="w-64">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-y-6 gap-x-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div className="contents" key={i}>
            <div className="capitalize text-sm font-semibold">
              <Skeleton className="h-5 w-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-6 rounded-md" />
              {[0, 1].map((j) => (
                <div className="flex gap-2 items-center" key={j}>
                  <Skeleton className="h-8 w-24" />
                  <span className="text-muted-foreground">-</span>
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}

async function RenderSchedule() {
  const schedule = await getSchedule();

  return <ScheduleForm schedule={schedule} />;
}
