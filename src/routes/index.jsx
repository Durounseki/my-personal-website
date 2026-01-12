import { createFileRoute } from "@tanstack/react-router";
import Details from "../components/Home/Details";
import Skills from "../components/Home/Skills";
import Projects from "../components/Home/Projects";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const details = {
    name: "Esparza Lopez",
    role: "Full Stack Developer",
    contact: "christian@esparzalopez.com",
    location: "Japan",
    socialLinks: [
      { href: "https://github.com/Durounseki", faClass: "fa-brands fa-github" },
      {
        href: "https://www.linkedin.com/in/christian-esparza-115128200/",
        faClass: "fa-brands fa-linkedin",
      },
    ],
  };

  return (
    <main>
      <Details details={details} />
      <Skills />
      <Projects />
    </main>
  );
}
