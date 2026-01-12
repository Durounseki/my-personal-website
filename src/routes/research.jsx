import { createFileRoute } from "@tanstack/react-router";
import Details from "../components/Home/Details";
import Bio from "../components/Research/Bio";
import Publications from "../components/Research/Publications";

export const Route = createFileRoute("/research")({
  component: Research,
});

function Research() {
  const details = {
    name: "Esparza Lopez",
    role: "PhD Applied Mathematics",
    contact: "christian.esparza@oist.jp",
    location: "Okinawa Institute of Science and Technology",
    socialLinks: [
      {
        href: "https://scholar.google.com/citations?hl=en&user=cOaU1pUAAAAJ",
        faClass: "fa-brands fa-google-scholar",
      },
      {
        href: "https://www.linkedin.com/in/christian-esparza-115128200/",
        faClass: "fa-brands fa-linkedin",
      },
    ],
  };

  return (
    <main>
      <Details details={details} />
      <Bio />
      <Publications />
    </main>
  );
}
