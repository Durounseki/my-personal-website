import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";
import fallbackProjects from "../../../utils/fallbackProjects";
import styles from "./styles.module.css";

const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;

function Projects() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch(`${apiRootUrl}/api/projects`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    // If the API fails, it will return the fallback data instead of showing an error
    placeholderData: fallbackProjects,
    retry: 1,
  });

  if (isLoading) return <p className={styles.loading}>Loading projects...</p>;

  const displayData = isError ? fallbackProjects : projects;

  return (
    <section className={styles["content-section"]}>
      <h2>PROJECTS</h2>
      {displayData.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

export default Projects;
