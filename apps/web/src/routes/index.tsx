import { Button } from "@same-room-different-life/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";

const HomeComponent = () => (
  <main className="flex min-h-svh flex-col items-center justify-center gap-6">
    <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
      Same room, Different life.
    </h1>
    <Button asChild>
      <Link to="/join">Join</Link>
    </Button>
  </main>
);

export const Route = createFileRoute("/")({
  component: HomeComponent,
});
