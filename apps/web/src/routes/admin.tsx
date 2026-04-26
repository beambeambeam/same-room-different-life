import { createFileRoute } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { adminProcedure } from "@/lib/auth-guards";

const AdminComponent = () => {
  const { data: session } = authClient.useSession();

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col justify-center gap-4 px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-600">
        Admin Area
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Admin access confirmed.
      </h1>
      <p className="max-w-xl text-base text-neutral-600 sm:text-lg">
        Only users with the <code>admin</code> role can open this page.
      </p>
      <dl className="grid gap-4 rounded-2xl border border-red-200 bg-red-50/70 p-6 shadow-sm backdrop-blur sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-neutral-500">Signed in as</dt>
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

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => await adminProcedure(),
  component: AdminComponent,
});
