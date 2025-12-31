import { EventForm } from "@/components/forms/EventForm";
import { ScheduleForm } from "@/components/forms/ScheduleForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchedule } from "@/data/user/user-get-schedule";

export default async function SchedulePage() {
  const schedule = await getSchedule();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Horario</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
      </CardContent>
    </Card>
  );
}
