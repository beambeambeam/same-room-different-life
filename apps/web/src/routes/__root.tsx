import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";

import "../index.css";

export type RouterAppContext = object;

const RootComponent = () => (
  <>
    <HeadContent />
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
    <TanStackRouterDevtools position="bottom-left" />
  </>
);

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    links: [
      {
        href: "/favicon.ico",
        rel: "icon",
      },
    ],
    meta: [
      {
        title: "same-room-different-life",
      },
      {
        content: "same-room-different-life is a web application",
        name: "description",
      },
    ],
  }),
});
