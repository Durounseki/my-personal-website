import styles from "./PublicationCard.module.css";

function PublicationCard({ publication }) {
  return (
    <section className={styles.publication}>
      <header className={styles.date}>{publication.date}</header>
      <h3 className={styles.title}>{publication.title}</h3>
      <p className={styles.reference}>
        {publication.authors}, <cite>{publication.journal}</cite>{" "}
        {publication.volume} {publication.page}, ({publication.year})
      </p>

      {publication.link && (
        <a
          className={styles.link}
          href={publication.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          Preprint <i className="fa-solid fa-angles-right"></i>
        </a>
      )}

      <footer className={styles.keywords}>
        <ul>
          {publication.keywords.map((keyword, index) => (
            <li key={index} className={styles.keyword}>
              {keyword}
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}

export default PublicationCard;
