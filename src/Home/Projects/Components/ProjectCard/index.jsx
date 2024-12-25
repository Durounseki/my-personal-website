import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProjectCard({project}){
    
    return (
        <section className="project">
            <header className="project-date">{project.date}</header>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-links">
                <a href={project.live} rel="noopener noreferrer" target="_blank" className="project-info"><i className="fa-solid fa-globe"></i>Live</a>
                <Link className="project-info" href={project.more}>Learn more <i className="fa-solid fa-angles-right"></i></Link>
            </div>
            <footer className="project-technologies">
                <ul>
                    {project.technologies.map((tech, index) => (
                        <li className="project-tech" key={index}>{tech}</li>
                    ))}
                </ul>
            </footer>
        </section>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.shape({
      date: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      live: PropTypes.string,
      more: PropTypes.string.isRequired, 
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default ProjectCard