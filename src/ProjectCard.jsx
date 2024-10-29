function ProjectCard({project}){
    return (
        <section className="project">
            <header className="project-date">{project.date}</header>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <a className="project-info" href="#">Learn more <i className="fa-solid fa-angles-right"></i></a>
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

export default ProjectCard