import { useState, useEffect } from 'react';
import './Projects.css';
import ProjectCard from "./ProjectCard.jsx";
import fallbackProjects from './fallbackProjects.js';

function Projects(){
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`${apiRootUrl}/api/projects`, {mode: "cors"});
                const data = await response.json();
                setProjects(data);
            }catch{
                setProjects(fallbackProjects);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);
    if(loading){
        return <p>Loading...</p>
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