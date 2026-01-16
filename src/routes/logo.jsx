import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Logo from "../components/Logo";

export const Route = createFileRoute("/logo")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return <Logo isLoading={isLoading} />;
}
