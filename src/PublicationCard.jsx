function PublicationCard({publication}){
    return (
        <section className="publication">
            <header className="publication-date">{publication.date}</header>
            <h3 className="publication-title">{publication.title}</h3>
            <p className="publication-reference">{publication.authors}, <cite>{publication.journal}</cite> {publication.volume} {publication.page}, ({publication.year})</p>
            {publication.link !== "" ? <a className="publication-link" href={publication.link} target="_blank" rel="noreferrer noopener">Preprint <i className="fa-solid fa-angles-right"></i></a> : ""}
            <footer className="publication-keywords">
                <ul>
                    {publication.keywords.map((keyword, index) => (
                        <li key={index} className="publication-keyword">{keyword}</li>
                    ))}
                </ul>
            </footer>
        </section>
    )
}

export default PublicationCard;