import PublicationCard from "./PublicationCard";
import fallbackPublications from "../../../utils/fallbackPublications";

function Publications() {
  const publications = fallbackPublications.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section className="publications">
      <h2>PUBLICATIONS</h2>
      <div className="publications-grid">
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>
    </section>
  );
}

export default Publications;
