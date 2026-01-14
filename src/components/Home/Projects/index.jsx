import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";
import fallbackProjects from "../../../utils/fallbackProjects";
import styles from "./styles.module.css";

const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;

function Projects() {
  const projects = fallbackProjects.sort((a, b) => {
    // To sort Newest to Oldest (Descending)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  //   const {
  //     data: projects,
  //     isLoading,
  //     isError,
  //   } = useQuery({
  //     queryKey: ["projects"],
  //     queryFn: async () => {
  //       const response = await fetch(`${apiRootUrl}/api/projects`);
  //       if (!response.ok) throw new Error("Network response was not ok");
  //       return response.json();
  //     },
  //     placeholderData: fallbackProjects,
  //     retry: 1,
  //   });

  //   if (isLoading) return <p>Loading projects...</p>;

  //   const displayData = isError ? fallbackProjects : projects;

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
