import { createFileRoute } from "@tanstack/react-router";
import Resume from "../components/Resume";

export const Route = createFileRoute("/keirekisho")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Resume url={"/api/keirekisho"} />;
}
