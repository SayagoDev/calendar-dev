import { Container } from "@/components/Container";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <main className="container my-6">{children}</main>
    </Container>
  );
}
