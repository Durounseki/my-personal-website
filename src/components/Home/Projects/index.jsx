import ProjectCard from "./ProjectCard";
import fallbackProjects from "../../../utils/fallbackProjects";

function Projects() {
  const projects = fallbackProjects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section className="content-section">
      <h2>PROJECTS</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
