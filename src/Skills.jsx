import './Skills.css';

function Skills(){
    const techStack = [
        {
            name: "HTML",
            faClass: "fa-brands fa-html5"
        },
        {
            name: "CSS",
            faClass: "fa-brands fa-css3-alt"
        },
        {
            name: "JavaScript",
            faClass: "fa-brands fa-js"
        },
        {
            name: "React",
            faClass: "fa-brands fa-react"
        },
        {
            name: "Node",
            faClass: "fa-brands fa-node"
        },
    ]
    return(

        <>
            <section className="skills">
                <h2>TECHSTACK</h2>
                <article>
                    <ul>
                        {techStack.map((icon, index) => (
                            <li className="skill">
                                <i
                                    key={index}
                                    className={icon.faClass}
                                >
                                </i>
                                <p>{icon.name}</p>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        </>
    )
}

export default Skills;