import PublicationCard from "./PublicationCard";
import './Publications.css';

function Publications({publications}){
    return (
        <>
            <section className="publications">
                <h2>PUBLICATIONS</h2>
                {publications.map((publication) => (
                    <PublicationCard key={publication.id} publication={publication}/>
                ))}
            </section>
        </>
    )
}

export default Publications;