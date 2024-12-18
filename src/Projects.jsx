import { useState, useEffect } from 'react';
import './Projects.css';
import ProjectCard from "./ProjectCard";

function Projects(){
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        fetch(`${apiRootUrl}/api/projects`, {mode: "cors"})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setProjects(data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },[]);
    
    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        console.log(error);
        return <p>A network error was encountered</p>
    }
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