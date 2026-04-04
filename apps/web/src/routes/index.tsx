import { createFileRoute } from "@tanstack/react-router";

const HomeComponent = () => (
  <main className="flex min-h-svh items-center justify-center">
    <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
      Same room, Different life.
    </h1>
  </main>
);

export const Route = createFileRoute("/")({
  component: HomeComponent,
});
