import { createFileRoute, Outlet } from "@tanstack/react-router";
import { EditorContextProvider } from "../../components/EditorContext";

export const Route = createFileRoute("/blog/posts")({
  component: () => (
    <EditorContextProvider>
      <Outlet />
    </EditorContextProvider>
  ),
});
