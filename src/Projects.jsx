import './Projects.css';
import ProjectCard from "./ProjectCard";

function Projects(){
    const projects = [
        {
            id: "1",
            name: "The Dance Thread",
            date: "(coming soon)",
            category: "Full Stack",
            description: "A social network dedicated to dancers. Discover events, classes, socials and engage with other dancers worldwide.",
            technologies: ["HTML&CSS", "JavaScript", "Node", "Express", "Prisma", "PostgreSQL"],
            repository: "",
            live: ""
        },
        {
            id: "2",
            name: "Golden Wings Chicken",
            date: "2024-05",
            category: "Front End",
            description: "Single page application built with vanilla JavaScript and bundled with Webpack. The site showcases Golden Wings Chicken's menu using a responsive design. Customers can easily find the restaurant location and contact them.",
            technologies: ["HTML&CSS", "JavaScript", "Webpack"],
            repository: "https://github.com/Durounseki/odin-restaurant",
            live: "https://durounseki.github.io/odin-restaurant/"
        },
        {
            id: "3",
            name: "Nutricion Libreros",
            date: "2024-05",
            category: "Front End",
            description: "This website for Dr. Libreros features a clean, responsive design showcasing their methodology and services. Interactive elements and clear navigation enhance the user experience, while the visual design effectively communicates their brand.",
            technologies: ["HTML&CSS", "JavaScript"],
            repository: "https://github.com/Durounseki/libreros_nutricion",
            live: "https://durounseki.github.io/libreros_nutricion/"
        },
    ]
    return(
        <section className="content-section">
            <h2>PROJECTS</h2>
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project}/>
            ))}
        </section>
    )
}
export default Projects;