import { Button } from "@same-room-different-life/ui/components/button";
import { Logo } from "@same-room-different-life/ui/components/logo";
import { createFileRoute, Link } from "@tanstack/react-router";

const HomeComponent = () => (
  <main className="flex min-h-svh flex-col items-center justify-center gap-6">
    <Logo variant="long" theme="light" className="w-96 max-w-full" />
    <Button asChild>
      <Link to="/join">Join</Link>
    </Button>
  </main>
);

export const Route = createFileRoute("/")({
  component: HomeComponent,
});
