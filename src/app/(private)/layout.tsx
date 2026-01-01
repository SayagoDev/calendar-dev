import { Container } from "@/components/Container";
import { NavLink } from "@/components/NavLink";
import { UserButton } from "@clerk/nextjs";
import { CalendarRange } from "lucide-react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container>
        <header className="flex py-2 border-b bg-card">
          <nav className="font-medium flex items-center text-sm gap-6 container mx-auto">
            <div className="flex items-center gap-2 font-semibold mr-auto">
              <CalendarRange className="size-6" />
              <span className="sr-only md:not-sr-only">Calendar;dev</span>
            </div>
            <NavLink href="/events">Eventos</NavLink>
            <NavLink href="/schedule">Horarios</NavLink>
            <div className="ml-auto">
              <UserButton />
            </div>
          </nav>
        </header>
        <main className="my-6">{children}</main>
      </Container>
    </>
  );
}
