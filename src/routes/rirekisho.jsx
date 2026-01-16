import { createFileRoute } from "@tanstack/react-router";
import Resume from "../components/Resume";

export const Route = createFileRoute("/rirekisho")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Resume url={"/api/rirekisho"} />;
}
