import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useIsFetching } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import useAlert from "../components/AlertContext/useAlert";
import AlertMessage from "../components/AlertMessage";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [hasSiteOpened, setHasSiteOpened] = useState(false);
  const isFetching = useIsFetching({ queryKey: ["posts"] }) > 0;
  const { alert, clearAlert } = useAlert();

  const globalLoading = !hasSiteOpened && isFetching;

  return (
    <main>
      <AlertMessage
        message={alert.message}
        type={alert.type}
        onDeleteMessage={clearAlert}
      />
      <Logo
        isLoading={globalLoading}
        onVanishComplete={() => setHasSiteOpened(true)}
      />
      <Header />
      <article className="content">
        <Outlet />
      </article>
      <Footer />
    </main>
  );
}
