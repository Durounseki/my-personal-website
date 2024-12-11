import PublicationCard from "./PublicationCard";
import './Publications.css';
import PropTypes from 'prop-types';

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

Publications.propTypes = {
    publications: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          date: PropTypes.string,
          title: PropTypes.string.isRequired,
          authors: PropTypes.string.isRequired,
          journal: PropTypes.string,
          volume: PropTypes.string,
          page: PropTypes.string,
          year: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]).isRequired,
          link: PropTypes.string,
          keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ).isRequired,
}

export default Publications;