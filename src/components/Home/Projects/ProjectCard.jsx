// src/components/Home/Projects/ProjectCard.jsx
import { Link } from "@tanstack/react-router";
import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  return (
    <section className={styles.project}>
      <header className={styles["project-date"]}>{project.date}</header>
      <h3 className={styles["project-name"]}>{project.name}</h3>
      <p className={styles["project-description"]}>{project.description}</p>

      <div className={styles["project-links"]}>
        <a
          href={project.live}
          rel="noopener noreferrer"
          target="_blank"
          className={styles["project-info"]}
        >
          <i className="fa-solid fa-globe"></i> Live
        </a>
        <Link to={project.more} className={styles["project-info"]}>
          Learn more <i className="fa-solid fa-angles-right"></i>
        </Link>
      </div>

      <footer className={styles["project-technologies"]}>
        <ul className={styles.techList}>
          {project.technologies.map((tech, index) => (
            <li className={styles["project-tech"]} key={index}>
              {tech}
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}

export default ProjectCard;
