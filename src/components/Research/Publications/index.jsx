import { useQuery } from "@tanstack/react-query";
import PublicationCard from "./PublicationCard";
import fallbackPublications from "../../../utils/fallbackPublications";
import styles from "./styles.module.css";

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

  return (
    <section className={styles.publications}>
      <h2 className={styles.title}>PUBLICATIONS</h2>
      {isLoading && <p>Updating publication list...</p>}
      <div className={styles.list}>
        {displayData.map((pub) => (
          <PublicationCard key={pub.id} publication={pub} />
        ))}
      </div>
    </section>
  );
}

export default Publications;
