import { createFileRoute, Link } from "@tanstack/react-router";

const NotFoundComponent = () => (
  <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
      404
    </p>
    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
      Page not found.
    </h1>
    <p className="max-w-md text-base text-neutral-600 sm:text-lg">
      The page you requested does not exist or is not available to your account.
    </p>
    <Link className="text-sm font-medium text-neutral-950 underline" to="/">
      Return home
    </Link>
  </main>
);

export const Route = createFileRoute("/404")({
  component: NotFoundComponent,
});
