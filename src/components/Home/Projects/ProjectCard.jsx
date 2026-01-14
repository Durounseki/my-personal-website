import { Link } from "@tanstack/react-router";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  const cardStyle = {
    backgroundImage: `url(${project.image})`,
  };

  return (
    <section className="project card-variant" style={cardStyle}>
      <div className="project-overlay">
        <header className="project-date">{project.date}</header>
        <div className="project-body">
          <h3 className="project-name">{project.name}</h3>
          <p className="project-description">{project.description}</p>
        </div>

        <div className="project-footer-wrapper">
          <div className="project-links">
            <a
              href={project.live}
              rel="noopener noreferrer"
              target="_blank"
              className="project-info"
            >
              <i className="fa-solid fa-globe"></i> Live
            </a>
            <Link to={project.more} className="project-info">
              Learn more <i className="fa-solid fa-angles-right"></i>
            </Link>
          </div>

          <footer className="project-technologies">
            <ul>
              {project.technologies.map((tech, index) => (
                <li className="project-tech" key={index}>
                  {tech}
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default ProjectCard;
