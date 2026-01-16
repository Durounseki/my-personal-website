import { createFileRoute } from "@tanstack/react-router";
import Resume from "../components/Resume";

export const Route = createFileRoute("/resume")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Resume url="/api/resume" />;
}
