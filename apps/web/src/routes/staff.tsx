import { createFileRoute } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { privateProcedure } from "@/lib/auth-guards";

const StaffComponent = () => {
  const { data: session } = authClient.useSession();

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col justify-center gap-4 px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
        Staff Area
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Welcome back{session?.user.name ? `, ${session.user.name}` : ""}.
      </h1>
      <p className="max-w-xl text-base text-neutral-600 sm:text-lg">
        This page is only available to authenticated users.
      </p>
      <dl className="grid gap-4 rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-neutral-500">Email</dt>
          <dd className="mt-1 text-base font-medium text-neutral-950">
            {session?.user.email ?? "Unknown"}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-neutral-500">Role</dt>
          <dd className="mt-1 text-base font-medium text-neutral-950">
            {session?.user.role ?? "user"}
          </dd>
        </div>
      </dl>
    </main>
  );
};

export const Route = createFileRoute("/staff")({
  beforeLoad: async () => await privateProcedure(),
  component: StaffComponent,
});
