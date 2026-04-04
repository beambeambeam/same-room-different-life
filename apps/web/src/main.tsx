import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { env } from "@same-room-different-life/env/web";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ConvexReactClient } from "convex/react";
import ReactDOM from "react-dom/client";

import { authClient } from "@/lib/auth-client";

import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";
const convex = new ConvexReactClient(env.VITE_CONVEX_URL, {
  expectAuth: true,
});

const router = createRouter({
  Wrap: function WrapComponent({ children }: { children: React.ReactNode }) {
    return (
      <ConvexBetterAuthProvider client={convex} authClient={authClient}>
        {children}
      </ConvexBetterAuthProvider>
    );
  },
  context: {},
  defaultPendingComponent: () => <Loader />,
  defaultPreload: "intent",
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.querySelector("#app");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
