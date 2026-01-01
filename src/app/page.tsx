import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  if (userId != null) redirect("/events");

  return (
    <div className="text-center container my-4 mx-auto">
      <h1 className="text-3xl mb-4">Bienvenido a Calendar;dev</h1>
      <div className="flex gap-2 justify-center">
        <Button asChild>
          <SignInButton>Iniciar sesión</SignInButton>
        </Button>
        <Button asChild>
          <SignUpButton>Registrarme</SignUpButton>
        </Button>
        <UserButton />
      </div>
    </div>
  );
}
