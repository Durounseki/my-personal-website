import { useState, useEffect } from 'react';
import './style.css';
import ProjectCard from "./Components/ProjectCard";
import fallbackProjects from './utils/fallbackProjects.js';

function Projects(){
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;

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