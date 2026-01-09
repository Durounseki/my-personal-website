import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import NotFound from "./components/ErrorComponent/NotFound";
import GeneralError from "./components/ErrorComponent/GeneralError";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/main.css";

import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: GeneralError,
  routeTree,
  context: { queryClient },
});

const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
