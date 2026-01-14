import { useQuery } from "@tanstack/react-query";
import PublicationCard from "./PublicationCard";
import fallbackPublications from "../../../utils/fallbackPublications";

const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;

function Publications() {
  const {
    data: publications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publications"],
    queryFn: async () => {
      const response = await fetch(`${apiRootUrl}/api/publications`);
      if (!response.ok) throw new Error("Failed to fetch publications");
      return response.json();
    },
    placeholderData: fallbackPublications,
    retry: 1,
  });

  const displayData = isError ? fallbackPublications : publications;

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="publications">
      <h2>PUBLICATIONS</h2>
      {displayData.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </section>
  );
}

export default Publications;
